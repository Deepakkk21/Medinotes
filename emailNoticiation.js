// emailNotifications.js

const nodemailer = require("nodemailer");

function sendEmailNotification(user, medicineName, medicineTime) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'projectus0001@gmail.com', 
            pass: 'nmbn seyw axdj pzix' 
        }
    });

    const mailOptions = {
        from: 'projectus0001@gmail.com',
        to: user.email,
        subject: 'New Medicine Added',
        text: `Dear user,\n\nYou have added a new medicine.\n\nMedicine Name: ${medicineName}\nTime: ${medicineTime}\n\nBest regards,\nYour App`
    };

    return transporter.sendMail(mailOptions);
}

module.exports =  sendEmailNotification ;
