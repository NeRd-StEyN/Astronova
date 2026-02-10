const express = require('express');
const router = express.Router();
const { validateCartItem } = require('../middleware/validator');

let cart = [];

router.post('/', validateCartItem, (req, res) => {
    const { productId, quantity } = req.body;

    res.status(201).json({
        message: "Item added to cart successfully",
        item: { productId, quantity }
    });
});

module.exports = router;
