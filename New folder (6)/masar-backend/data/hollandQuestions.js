const hollandQuestions = [
  // Realistic Questions (R)
  { id: 1, question: "أستمتع بإصلاح الأشياء", type: "realistic" },
  { id: 2, question: "أحب العمل بيدي", type: "realistic" },
  { id: 3, question: "أستمتع بالأنشطة الخارجية", type: "realistic" },
  { id: 4, question: "أفضل العمل مع الآلات والأدوات", type: "realistic" },
  { id: 5, question: "أحب الأعمال اليدوية والحرفية", type: "realistic" },
  { id: 6, question: "أستمتع بالبناء والتركيب", type: "realistic" },
  { id: 7, question: "أفضل الأنشطة العملية على النظرية", type: "realistic" },
  { id: 8, question: "أحب التعامل مع المواد الملموسة", type: "realistic" },
  { id: 9, question: "أستمتع بالرياضات البدنية", type: "realistic" },
  { id: 10, question: "أفضل العمل في البيئة المفتوحة", type: "realistic" },

  // Investigative Questions (I)
  { id: 11, question: "أحب حل الألغاز والمسائل المعقدة", type: "investigative" },
  { id: 12, question: "أستمتع بإجراء التجارب", type: "investigative" },
  { id: 13, question: "أحب قراءة المقالات العلمية", type: "investigative" },
  { id: 14, question: "أفضل تحليل البيانات والمعلومات", type: "investigative" },
  { id: 15, question: "أستمتع بالبحث والاستقصاء", type: "investigative" },
  { id: 16, question: "أحب دراسة الظواهر الطبيعية", type: "investigative" },
  { id: 17, question: "أفضل العمل المستقل والتفكير العميق", type: "investigative" },
  { id: 18, question: "أستمتع بحل المشكلات المعقدة", type: "investigative" },
  { id: 19, question: "أحب استخدام المنطق والتحليل", type: "investigative" },
  { id: 20, question: "أستمتع بالعمل في المختبرات", type: "investigative" },

  // Artistic Questions (A)
  { id: 21, question: "أحب الرسم والتصميم", type: "artistic" },
  { id: 22, question: "أستمتع بالموسيقى والغناء", type: "artistic" },
  { id: 23, question: "أحب كتابة القصص والشعر", type: "artistic" },
  { id: 24, question: "أفضل التعبير عن نفسي بطرق إبداعية", type: "artistic" },
  { id: 25, question: "أستمتع بالأنشطة الفنية", type: "artistic" },
  { id: 26, question: "أحب التصوير الفوتوغرافي", type: "artistic" },
  { id: 27, question: "أفضل العمل في بيئة إبداعية", type: "artistic" },
  { id: 28, question: "أستمتع بالتمثيل والأداء", type: "artistic" },
  { id: 29, question: "أحب الأزياء والديكور", type: "artistic" },
  { id: 30, question: "أفضل الأعمال التي تتطلب خيالاً", type: "artistic" },

  // Social Questions (S)
  { id: 31, question: "أحب مساعدة الآخرين في حل مشاكلهم", type: "social" },
  { id: 32, question: "أستمتع بالعمل مع الأطفال", type: "social" },
  { id: 33, question: "أحب التدريس والتوجيه", type: "social" },
  { id: 34, question: "أفضل العمل في فريق", type: "social" },
  { id: 35, question: "أستمتع بالأنشطة التطوعية", type: "social" },
  { id: 36, question: "أحب الاستماع لمشاكل الناس", type: "social" },
  { id: 37, question: "أفضل الوظائف الخدمية", type: "social" },
  { id: 38, question: "أستمتع بتنظيم الفعاليات الاجتماعية", type: "social" },
  { id: 39, question: "أحب رعاية المرضى والمحتاجين", type: "social" },
  { id: 40, question: "أفضل العمل في المجال الإنساني", type: "social" },

  // Enterprising Questions (E)
  { id: 41, question: "أحب قيادة المجموعات", type: "enterprising" },
  { id: 42, question: "أستمتع بالمفاوضات والإقناع", type: "enterprising" },
  { id: 43, question: "أحب بدء مشاريع جديدة", type: "enterprising" },
  { id: 44, question: "أفضل اتخاذ القرارات المهمة", type: "enterprising" },
  { id: 45, question: "أستمتع بالمبيعات والتسويق", type: "enterprising" },
  { id: 46, question: "أحب المخاطرة المحسوبة", type: "enterprising" },
  { id: 47, question: "أفضل العمل في بيئة تنافسية", type: "enterprising" },
  { id: 48, question: "أستمتع بإدارة الأعمال", type: "enterprising" },
  { id: 49, question: "أحب التأثير على الآخرين", type: "enterprising" },
  { id: 50, question: "أفضل المناصب القيادية", type: "enterprising" },

  // Conventional Questions (C)
  { id: 51, question: "أحب العمل مع الأرقام والحسابات", type: "conventional" },
  { id: 52, question: "أستمتع بالأعمال المكتبية", type: "conventional" },
  { id: 53, question: "أحب تنظيم الملفات والوثائق", type: "conventional" },
  { id: 54, question: "أفضل اتباع الإجراءات المحددة", type: "conventional" },
  { id: 55, question: "أستمتع بالأعمال الروتينية المنظمة", type: "conventional" },
  { id: 56, question: "أحب العمل مع البيانات والإحصائيات", type: "conventional" },
  { id: 57, question: "أفضل البيئات المنظمة والمرتبة", type: "conventional" },
  { id: 58, question: "أستمتع بأعمال المحاسبة", type: "conventional" },
  { id: 59, question: "أحب الدقة في التفاصيل", type: "conventional" },
  { id: 60, question: "أفضل الأعمال الإدارية", type: "conventional" }
];

module.exports = hollandQuestions;