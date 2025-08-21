const Package = require('../models/Package');

exports.getAllPackages = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;

    const packages = await Package.find(filter).sort({ isPopular: -1, createdAt: -1 });
    
    res.json({
      success: true,
      packages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'الباقة غير موجودة'
      });
    }

    res.json({
      success: true,
      package
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الباقة بنجاح',
      package
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'الباقة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث الباقة بنجاح',
      package
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'الباقة غير موجودة'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف الباقة بنجاح'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};