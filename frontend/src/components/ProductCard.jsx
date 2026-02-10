import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        addToCart(product);

        try {
            await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity: 1 })
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{product.description}</p>
                <div className="product-price">₹{product.price.toLocaleString()}</div>
                <button className="btn-add" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
