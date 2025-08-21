const Order = require('../models/Order');
const Package = require('../models/Package');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const { sendOrderConfirmationEmail } = require('../utils/emailService');
const { processPayment } = require('../utils/paymentService');

exports.createOrder = async (req, res) => {
  try {
    const {
      packageId,
      mentorId,
      customerInfo,
      paymentMethod
    } = req.body;

    // Validate package
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'الباقة غير موجودة'
      });
    }

    // Validate mentor if provided
    let mentor = null;
    if (mentorId) {
      mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({
          success: false,
          message: 'المرشد غير موجود'
        });
      }
    }

    // Create order
    const order = new Order({
      user: req.user ? req.user._id : null,
      package: packageId,
      mentor: mentorId,
      customerInfo,
      amount: package.price,
      paymentMethod,
      orderStatus: 'pending'
    });

    await order.save();

    // Process payment (mock implementation)
    try {
      const paymentResult = await processPayment({
        amount: package.price,
        method: paymentMethod,
        orderId: order._id
      });

      if (paymentResult.success) {
        order.paymentStatus = 'completed';
        order.orderStatus = 'confirmed';
        await order.save();

        // Update package order count
        await Package.findByIdAndUpdate(packageId, {
          $inc: { orderCount: 1 }
        });

        // Send confirmation email
        await sendOrderConfirmationEmail(customerInfo.email, order);

        res.status(201).json({
          success: true,
          message: 'تم إنشاء الطلب بنجاح',
          order: {
            orderNumber: order.orderNumber,
            status: order.orderStatus,
            amount: order.amount
          }
        });
      } else {
        order.paymentStatus = 'failed';
        await order.save();

        res.status(400).json({
          success: false,
          message: 'فشل في معالجة الدفع'
        });
      }
    } catch (paymentError) {
      console.error('Payment error:', paymentError);
      res.status(500).json({
        success: false,
        message: 'خطأ في معالجة الدفع'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (status) filter.orderStatus = status;

    const orders = await Order.find(filter)
      .populate('package', 'name price')
      .populate('mentor', 'name title')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('package')
      .populate('mentor')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      stats: {
        statusBreakdown: stats,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};