import nodemailer from 'nodemailer';

const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass || user === 'your_email@gmail.com' || pass === 'your_app_password') {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

export const submitContactForm = async (req, res) => {
  try {
    const { email, message } = req.body || {};

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Email and message are required.',
      });
    }

    const transporter = createTransporter();
    const recipient = process.env.CONTACT_TO_EMAIL || 'tigreenery2004@gmail.com';

    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: recipient,
        replyTo: email,
        subject: `SolarIQ Contact Form: New message from ${email}`,
        text: `Sender Email: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h3>New contact message from SolarIQ</h3>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br />')}</p>
          </div>
        `,
      });
    } else {
      console.log('SMTP not configured. Contact message intended for:', recipient);
      console.log('Sender:', email);
      console.log('Message:', message);
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now.',
    });
  }
};
