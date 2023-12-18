const jwt = require('jsonwebtoken');
const User = require('../modals/user');

const Medicine = require('../modals/medicine');
const sendEmailNotification = require('../emailNoticiation')

module.exports.medicineController = async function (req, res) {
    try {
        console.log(req.body);
        const token = req.cookies.token;
        
       const decodedToken = jwt.verify(token, 'Deepak');
        var userId = decodedToken.userId;

        var medicineName = req.body.medicineName;
        var medicineTime = req.body.medicineTime;

        // Check if medicine with the same name and time already exists
        const existingMedicine = await Medicine.findOne({ medicineName, medicineTime,user: userId });

        if (existingMedicine) {
            // Medicine with the same name and time already exists
            console.log('Medicine already added.');
            return res.send('Medicine already added.');
        } else {
            // Create a new medicine entry
            var medicine = await Medicine.create({ medicineName: medicineName, medicineTime: medicineTime,user: userId });
            console.log(medicine);
// 
            const user = await User.findById(userId);
            if (user.email) {
                try {
                    await sendEmailNotification(user, medicineName, medicineTime);
                    console.log('Email notification sent successfully.');
                } catch (error) {
                    console.error('Error sending email notification:', error);
                }
            }
// 
            return res.redirect('back');
        }
    } catch (error) {
        console.error(error);
        return res.status(401).send('Unauthorized');

    }
}
