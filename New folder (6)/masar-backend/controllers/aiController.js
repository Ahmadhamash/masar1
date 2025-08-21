const axios = require('axios');

exports.generateLearningPath = async (req, res) => {
  try {
    const { specialty } = req.body;

    if (!specialty || specialty.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'يرجى إدخال التخصص المطلوب'
      });
    }

    // Simulate AI response for learning path
    const learningPath = await generateAILearningPath(specialty);

    res.json({
      success: true,
      learningPath
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في توليد المسار التعليمي'
    });
  }
};

async function generateAILearningPath(specialty) {
  // This would integrate with OpenAI API or similar service
  // For now, returning mock data
  
  const mockPaths = {
    'تعلم بايثون': {
      levels: [
        {
          name: 'المستوى الأساسي',
          courses: [
            {
              title: 'مقدمة في البرمجة مع Python',
              description: 'تعلم أساسيات البرمجة والمفاهيم الأساسية',
              url: 'https://www.coursera.org/learn/python'
            },
            {
              title: 'هياكل البيانات في Python',
              description: 'فهم القوائم والقواميس والمجموعات',
              url: 'https://www.edx.org/course/python-data-structures'
            }
          ]
        },
        {
          name: 'المستوى المتوسط',
          courses: [
            {
              title: 'البرمجة الكائنية في Python',
              description: 'تعلم مفاهيم OOP والكلاسات',
              url: 'https://www.udemy.com/course/python-oop'
            },
            {
              title: 'مكتبات Python الشائعة',
              description: 'تعلم NumPy وPandas وMatplotlib',
              url: 'https://www.datacamp.com/courses/python-libraries'
            }
          ]
        },
        {
          name: 'المستوى المتقدم',
          courses: [
            {
              title: 'تطوير تطبيقات الويب مع Django',
              description: 'بناء تطبيقات ويب كاملة',
              url: 'https://www.djangoproject.com/start/'
            },
            {
              title: 'الذكاء الاصطناعي مع Python',
              description: 'تعلم Machine Learning وDeep Learning',
              url: 'https://www.tensorflow.org/learn'
            }
          ]
        }
      ]
    }
  };

  // Return mock data or call actual AI service
  return mockPaths[specialty] || {
    levels: [
      {
        name: 'مسار تعليمي مخصص',
        courses: [
          {
            title: `أساسيات ${specialty}`,
            description: `تعلم المفاهيم الأساسية في ${specialty}`,
            url: '#'
          }
        ]
      }
    ]
  };
}