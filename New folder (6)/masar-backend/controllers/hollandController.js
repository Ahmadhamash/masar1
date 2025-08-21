const User = require('../models/User');

// Holland Assessment Questions
const hollandQuestions = [
  { id: 1, question: "أستمتع بإصلاح الأشياء", type: "realistic" },
  { id: 2, question: "أحب العمل مع الأرقام", type: "conventional" },
  { id: 3, question: "أستمتع بكتابة القصص", type: "artistic" },
  { id: 4, question: "أحب مساعدة الآخرين", type: "social" },
  { id: 5, question: "أستمتع بقيادة المجموعات", type: "enterprising" },
  { id: 6, question: "أحب إجراء التجارب", type: "investigative" },
  // Add all 60 questions here...
];

exports.getQuestions = async (req, res) => {
  try {
    res.json({
      success: true,
      questions: hollandQuestions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.userId;

    // Calculate scores
    const scores = {
      realistic: 0,
      investigative: 0,
      artistic: 0,
      social: 0,
      enterprising: 0,
      conventional: 0
    };

    answers.forEach(answer => {
      const question = hollandQuestions.find(q => q.id === answer.questionId);
      if (question && answer.score) {
        scores[question.type] += answer.score;
      }
    });

    // Update user with results
    await User.findByIdAndUpdate(userId, {
      hollandResults: {
        ...scores,
        completedAt: new Date()
      }
    });

    // Generate career recommendations based on highest scores
    const sortedTypes = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([type]) => type);

    const recommendations = generateCareerRecommendations(sortedTypes);

    res.json({
      success: true,
      results: {
        scores,
        topTypes: sortedTypes.slice(0, 3),
        recommendations
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

function generateCareerRecommendations(topTypes) {
  const careerMap = {
    realistic: ['مهندس', 'فني', 'طيار', 'ميكانيكي'],
    investigative: ['طبيب', 'باحث', 'عالم', 'محلل'],
    artistic: ['مصمم', 'كاتب', 'فنان', 'موسيقي'],
    social: ['مدرس', 'مستشار', 'أخصائي اجتماعي', 'ممرض'],
    enterprising: ['رجل أعمال', 'مبيعات', 'مدير', 'محامي'],
    conventional: ['محاسب', 'مصرفي', 'كاتب', 'إداري']
  };

  return topTypes.slice(0, 3).map(type => ({
    type,
    careers: careerMap[type] || []
  }));
}