const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'verma.akash04989@gmail.com',
        pass: '9576227153'
    }
});

const emailService = () => {
const sendEmail = async (attachments,  email) => {
    let info = await transporter.sendMail({
        from: 'verma.akash04989@gmail.com',
        to: email, 
        subject: 'Askrango item list', 
        attachments
      
    });
}


return {
    sendEmail
  };
};

module.exports = emailService;