const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: errors.array()
    });
  }
  next();
};

const userValidation = [
  body('name').notEmpty().withMessage('الاسم مطلوب'),
  body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح'),
  body('phone').notEmpty().withMessage('رقم الهاتف مطلوب'),
  handleValidationErrors
];

const packageValidation = [
  body('name').notEmpty().withMessage('اسم الباقة مطلوب'),
  body('price').isNumeric().withMessage('السعر يجب أن يكون رقماً'),
  body('duration').isNumeric().withMessage('المدة يجب أن تكون رقماً'),
  body('category').isIn(['secondary', 'university', 'professional']).withMessage('فئة غير صحيحة'),
  handleValidationErrors
];

const mentorValidation = [
  body('name').notEmpty().withMessage('اسم المرشد مطلوب'),
  body('email').isEmail().withMessage('البريد الإلكتروني غير صحيح'),
  body('title').notEmpty().withMessage('المسمى الوظيفي مطلوب'),
  body('experience').isNumeric().withMessage('سنوات الخبرة يجب أن تكون رقماً'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  userValidation,
  packageValidation,
  mentorValidation
};