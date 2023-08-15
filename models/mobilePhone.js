const mongoose = require('mongoose');

const MobilePhoneSchema = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        require: true,
        enum: [
            "Apple",
            "Samsung",
            "Google",
            "OnePlus",
            "Tecno",
            "Infinix",
            "Xiaomi",
            "Realme",
            "Nokia",
            "Motorola",
            "BlackBerry",
            "LG",
            "Asus",
            "Acer",
            "Sony",
            "QMobile",
            "Huawei",
            "Vivo",
            "BLU",
            "Alcatel",
            "ZTE ",
            "Oppo",
            "Micromax",
            "HTC",
            "Honor",
            "Lenovo",
            "Celkon",
            "Philips"
        ]
    },
    condition: {
        type: String,
        require: true,
        enum: ["New", "Used", "Box Open", "Refurbished", "For Parts Not Working"]
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contact_Number: {
        require: true,
        type: String,
    },
}, { timestamps: true });

const Mobile = mongoose.model('Mobile-Phone', MobilePhoneSchema);

module.exports = {
    Mobile,
};