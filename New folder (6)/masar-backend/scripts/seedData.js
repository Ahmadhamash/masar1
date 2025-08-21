const mongoose = require('mongoose');
const Package = require('../models/Package');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
require('dotenv').config();

const packages = [
  {
    name: 'باقة الانطلاقة',
    nameEn: 'start',
    description: 'مثالية لطلاب الثانوية الذين يريدون اختيار التخصص المناسب',
    price: 580,
    duration: 90,
    features: [
      'جلسة استكشافية شاملة (90 دقيقة)',
      'تقرير مفصل للتخصصات المناسبة',
      'خطة دراسية مخصصة للسنوات القادمة',
      'متابعة لمدة شهر عبر الواتساب'
    ],
    category: 'secondary',
    isPopular: false
  },
  {
    name: 'جلسة استشارية',
    nameEn: 'consult',
    description: 'ساعة تركيز كاملة مع خبير للإجابة على أسئلتك',
    price: 199,
    duration: 60,
    features: [
      '60 دقيقة تركيز كامل مع المستشار',
      'مراجعة وتحسين السيرة الذاتية',
      'استشارة فورية لأي موضوع مهني',
      'نصائح عملية قابلة للتطبيق'
    ],
    category: 'professional',
    isPopular: true
  },
  {
    name: 'باقة الخريج',
    nameEn: 'graduate',
    description: 'للخريجين الذين يريدون الانطلاق في سوق العمل بقوة',
    price: 780,
    duration: 120,
    features: [
      'إعداد سيرة ذاتية احترافية',
      'تدريب مكثف على المقابلات الوظيفية',
      'تطوير وتحسين ملف LinkedIn',
      'خطة بحث عن عمل لمدة 3 أشهر',
      'متابعة مستمرة حتى الحصول على وظيفة'
    ],
    category: 'university',
    isPopular: false
  }
];

const mentors = [
  {
    name: 'أفنان الشهراني',
    email: 'afnan@masar.com',
    title: 'مرشدة مهنية معتمدة',
    specialties: ['الإرشاد المهني', 'التخطيط الوظيفي', 'تطوير المهارات'],
    experience: 5,
    bio: 'خبيرة في الإرشاد المهني مع أكثر من 5 سنوات خبرة في مساعدة الطلاب على اختيار التخصص المناسب والتخطيط للمستقبل المهني.',
    avatar: 'https://weflawless.co/_next/image?url=%2Fimages%2Fmentors%2FAfnan.jpeg&w=256&q=75',
    rating: 4.9,
    sessionCount: 156,
    availability: [
      {
        day: 'sunday',
        times: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'monday',
        times: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'tuesday',
        times: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'wednesday',
        times: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'thursday',
        times: [{ start: '09:00', end: '17:00' }]
      }
    ]
  },
  {
    name: 'ابتسام الحربي',
    email: 'ibtisam@masar.com',
    title: 'مستشارة مهنية معتمدة',
    specialties: ['الاستشارات المهنية', 'تطوير المهارات', 'إعداد السيرة الذاتية'],
    experience: 7,
    bio: 'مستشارة مهنية معتمدة مع خبرة واسعة في مساعدة الخريجين على الدخول إلى سوق العمل وتطوير مهاراتهم المهنية.',
    avatar: 'https://weflawless.co/_next/image?url=%2Fimages%2Fmentors%2FLulu.jpeg&w=256&q=75',
    rating: 4.8,
    sessionCount: 98,
    availability: [
      {
        day: 'sunday',
        times: [{ start: '10:00', end: '18:00' }]
      },
      {
        day: 'monday',
        times: [{ start: '10:00', end: '18:00' }]
      },
      {
        day: 'tuesday',
        times: [{ start: '10:00', end: '18:00' }]
      },
      {
        day: 'wednesday',
        times: [{ start: '10:00', end: '18:00' }]
      }
    ]
  },
  {
    name: 'محمد الغامدي',
    email: 'mohamed@masar.com',
    title: 'مدرب مهني ومستشار أعمال',
    specialties: ['ريادة الأعمال', 'التطوير المهني', 'القيادة'],
    experience: 8,
    bio: 'مدرب مهني ومستشار أعمال مع خبرة 8 سنوات في مساعدة المهنيين على تطوير مسيرتهم المهنية وبناء مشاريعهم الخاصة.',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/flawless-2022.appspot.com/o/mentors%2F1697095697?alt=media&token=4251025a-4573-4416-a367-a2f099037c86',
    rating: 4.7,
    sessionCount: 73,
    availability: [
      {
        day: 'saturday',
        times: [{ start: '14:00', end: '20:00' }]
      },
      {
        day: 'sunday',
        times: [{ start: '14:00', end: '20:00' }]
      },
      {
        day: 'monday',
        times: [{ start: '18:00', end: '22:00' }]
      },
      {
        day: 'tuesday',
        times: [{ start: '18:00', end: '22:00' }]
      }
    ]
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/masar');
    console.log('🔌 Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Package.deleteMany({});
    await Mentor.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = new User({
      name: 'مدير النظام',
      email: 'admin@masar.com',
      password: 'admin123456',
      phone: '0500000000',
      role: 'admin'
    });
    await admin.save();

    // Create packages
    console.log('📦 Creating packages...');
    await Package.insertMany(packages);

    // Create mentors
    console.log('👨‍🏫 Creating mentors...');
    await Mentor.insertMany(mentors);

    console.log('✅ تم إدخال البيانات الأولية بنجاح');
    console.log('📊 إحصائيات البيانات:');
    console.log(`   - المستخدمين: ${await User.countDocuments()}`);
    console.log(`   - الباقات: ${await Package.countDocuments()}`);
    console.log(`   - المرشدين: ${await Mentor.countDocuments()}`);
    console.log('\n🔐 بيانات تسجيل الدخول للإدارة:');
    console.log('   البريد الإلكتروني: admin@masar.com');
    console.log('   كلمة المرور: admin123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في إدخال البيانات:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedData();
}

module.exports = seedData;