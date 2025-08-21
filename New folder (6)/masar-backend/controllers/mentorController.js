const Mentor = require('../models/Mentor');
const Session = require('../models/Session');

exports.getAllMentors = async (req, res) => {
  try {
    const { status, specialty } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (specialty) filter.specialties = { $in: [specialty] };

    const mentors = await Mentor.find(filter)
      .sort({ rating: -1, sessionCount: -1 });
    
    res.json({
      success: true,
      mentors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'المرشد غير موجود'
      });
    }

    res.json({
      success: true,
      mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();

    res.status(201).json({
      success: true,
      message: 'تم إنشاء المرشد بنجاح',
      mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'المرشد غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث المرشد بنجاح',
      mentor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'المرشد غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم حذف المرشد بنجاح'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};

exports.getMentorStats = async (req, res) => {
  try {
    const mentorId = req.params.id;
    
    const sessions = await Session.find({ mentor: mentorId });
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const averageRating = completedSessions.reduce((acc, s) => acc + (s.feedback?.rating || 0), 0) / completedSessions.length || 0;
    
    const stats = {
      totalSessions: sessions.length,
      completedSessions: completedSessions.length,
      averageRating: Math.round(averageRating * 10) / 10,
      upcomingSessions: sessions.filter(s => s.status === 'scheduled').length
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'خطأ في الخادم'
    });
  }
};