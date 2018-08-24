const nodemailer = require('nodemailer');

const defaultEmailData ={from: 'beaconinfo@gmail.com'};


const sendEmail = (emailData) => {
    const completeEmailData = Object.assign(defaultEmailData, emailData);
    const transporter = nodemailer.createTransport('');
    transporter.sendMail(emailData, function(err){
        transporter.close()
    })
}

module.exports = sendEmail;

