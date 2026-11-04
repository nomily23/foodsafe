const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.post('/:merchantId/products', async (req, res) => {
    try {
        const { merchantId } = req.params;
        const { title, category, originalPrice, discountedPrice, expiryDate, quantity } = req.body;

        const newProduct = new Product({
            merchantId,
            title,
            category,
            originalPrice,
            discountedPrice: discountedPrice || 0, // יכול להיות 0 אם זה מסירה בחינם
            expiryDate,
            quantity,
            status: 'active'
        });

        await newProduct.save();
        res.status(201).json({ message: 'המוצר הועלה בהצלחה לפלטפורמה!', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בהעלאת המוצר' });
    }
});

router.get('/:merchantId/products', async (req, res) => {
    try {
        const { merchantId } = req.params;
        const products = await Product.find({ merchantId, status: 'active' });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בטעינת המוצרים' });
    }
});

router.patch('/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { status, quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { status, quantity },
            { new: true }
        );

        res.json({ message: 'המוצר עודכן בהצלחה', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה בעדכון המוצר' });
    }
});

router.delete('/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'המוצר לא נמצא' });
        }

        res.json({ message: 'המוצר נמחק בהצלחה מהמערכת' });
    } catch (error) {
        res.status(500).json({ error: 'שגיאה במחיקת המוצר' });
    }
});

module.exports = router;