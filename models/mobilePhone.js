const mongoose = require('mongoose');

const mobilephoneSchema = new mongoose.Schema({
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
            "Samsung",
            "LG",
            "QMobile",
            "Motorola",
            "Nokia",
            "Huawei",
            "Xiaomi",
            "Vivo",
            "BLU",
            "Alcatel",
            "ZTE ",
            "Oppo",
            "Micromax",
            "HTC",
            "Lenovo",
            "Celkon",
            "Asus",
            "Philips",
            "Realme",
            "Honor",
            "Sony Ericsson",
            "Sony",
            "Infinix",
            "Tecno",
            "Apple",
            "Acer",
            "BlackBerry",
            "OnePlus",
            "Google"
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

const Mobile = mongoose.model('Mobile-Phone', mobilephoneSchema);

module.exports = {
    Mobile,
};