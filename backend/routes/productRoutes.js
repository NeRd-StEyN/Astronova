const express = require('express');
const router = express.Router();

const products = [
    {
        id: 1,
        name: "Naksh Signature Gold Ring",
        price: 15000,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
        description: "Elegant 22k gold ring with intricate Nakashi work."
    },
    {
        id: 2,
        name: "Floral Diamond Studs",
        price: 25000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
        description: "Stunning floral design diamond earrings."
    },
    {
        id: 3,
        name: "Eternal Silver Necklace",
        price: 8000,
        image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&q=80",
        description: "Minimalist silver necklace for daily wear."
    },
    {
        id: 4,
        name: "Royal Emerald Pendant",
        price: 45000,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?w=500&q=80",
        description: "Breathtaking emerald pendant set in white gold."
    },
    {
        id: 5,
        name: "Vintage Pearl Bracelet",
        price: 12000,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
        description: "Classic pearl bracelet with a vintage charm."
    },
    {
        id: 6,
        name: "Bridal Kundan Set",
        price: 120000,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=500&q=80",
        description: "Exquisite Kundan necklace and earrings for brides."
    }
];

router.get('/', (req, res) => {
    res.json(products);
});

module.exports = router;
