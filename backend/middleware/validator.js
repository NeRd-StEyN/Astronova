const validateCartItem = (req, res, next) => {
    const { productId, quantity } = req.body;

    if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: "Valid quantity is required" });
    }

    next();
};

module.exports = { validateCartItem };
