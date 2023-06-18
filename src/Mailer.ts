import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'derrickmensahtorkornoo@gmail.com',
      pass: 'wfvbxbjecwikezfs',
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: 'derrickmensahtorkornoo@gmail.com',
    to: 'edwardtkay249@gmail.com',
    subject: 'Test email',
    text: 'This is a test email sent using Nodemailer and Gmail!',
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  