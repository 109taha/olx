const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Books', 'Furniture', 'Other'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['New', 'Used'],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
};
