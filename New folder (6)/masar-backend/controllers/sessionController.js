const Session = require('../models/Session');
const Order = require('../models/Order');
const { generateMeetingLink } = require('../utils/meetingService');

exports.createSession = async (req, res) => {
  try {
    const {
      orderId,
      scheduledDate,
      sessionType = 'video'
    } = req.body;

    // Validate order
    const order = await Order.findById(orderId)
      .populate('user')
      .populate('mentor')
      .populate('package');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    if (order.orderStatus !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'الطلب غير مؤكد'
      });
    }

    // Generate meeting link
    const meetingLink = await generateMeetingLink();

    const session = new Session({
      order: orderId,
      user: order.user._id,
      mentor: order.mentor._id,
      package: order.package._id,
      scheduledDate: new Date(scheduledDate),
      duration: order.package.duration,
      sessionType,
      meetingLink
    });

    await session.save();

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الجلسة بنجاح',
      session
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const { status, mentorId, userId, date } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (mentorId) filter.mentor = mentorId;
    if (userId) filter.user = userId;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      filter.scheduledDate = { $gte: startDate, $lt: endDate };
    }

    const sessions = await Session.find(filter)
      .populate('user', 'name email')
      .populate('mentor', 'name title')
      .populate('package', 'name')
      .sort({ scheduledDate: 1 });

    res.json({
      success: true,
      sessions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('mentor', 'name title email')
      .populate('package', 'name duration')
      .populate('order', 'orderNumber customerInfo');

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'الجلسة غير موجودة'
      });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.updateSessionStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = { status };
    
    if (status === 'in_progress') {
      updateData.startedAt = new Date();
    } else if (status === 'completed') {
      updateData.endedAt = new Date();
    }
    
    if (notes) {
      updateData[`notes.${req.user.role === 'admin' ? 'mentor' : 'user'}`] = notes;
    }

    const session = await Session.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'الجلسة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الجلسة بنجاح',
      session
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      {
        feedback: {
          rating,
          comment,
          submittedAt: new Date()
        }
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'الجلسة غير موجودة'
      });
    }

    // Update mentor rating
    const allSessions = await Session.find({
      mentor: session.mentor,
      'feedback.rating': { $exists: true }
    });

    const averageRating = allSessions.reduce((acc, s) => acc + s.feedback.rating, 0) / allSessions.length;
    
    await Mentor.findByIdAndUpdate(session.mentor, {
      rating: Math.round(averageRating * 10) / 10
    });

    res.json({
      success: true,
      message: 'تم إرسال التقييم بنجاح'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};