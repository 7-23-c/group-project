const nodemailer = require('nodemailer');

const sendEmail = (emailData) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cshorty1995@gmail.com',
            pass: '!wzhGKe3&yF6'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.sendMail(emailData, function(err){
        console.log(err);
        transporter.close();
    });
};

module.exports = sendEmail;

