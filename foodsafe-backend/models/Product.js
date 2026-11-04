const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    merchantId: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);