const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmationEmail = async (email, order) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `تأكيد الطلب - ${order.orderNumber}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif;">
          <h2>تأكيد الطلب</h2>
          <p>شكراً لك على طلبك!</p>
          <p><strong>رقم الطلب:</strong> ${order.orderNumber}</p>
          <p><strong>المبلغ:</strong> ${order.amount} ريال</p>
          <p>سنتواصل معك قريباً لتحديد موعد الجلسة.</p>
          <br>
          <p>فريق مسار</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

const sendSessionReminderEmail = async (email, session) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'تذكير بموعد الجلسة',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif;">
          <h2>تذكير بموعد الجلسة</h2>
          <p>لديك جلسة مجدولة غداً في الساعة ${new Date(session.scheduledDate).toLocaleTimeString('ar-SA')}.</p>
          <p><strong>رابط الجلسة:</strong> <a href="${session.meetingLink}">${session.meetingLink}</a></p>
          <br>
          <p>فريق مسار</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Reminder email sending failed:', error);
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendSessionReminderEmail
};