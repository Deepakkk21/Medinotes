const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const medicineSchema = new mongoose.Schema({
    medicineName: {type: String, required: true},
    medicineTime: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const medicine = mongoose.model('medicine', medicineSchema);

module.exports=medicine;