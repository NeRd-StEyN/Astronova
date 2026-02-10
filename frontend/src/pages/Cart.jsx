import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <Link to="/" style={{ color: '#d4af37', textDecoration: 'none', display: 'block', marginTop: '20px' }}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h1>Your Shopping Cart</h1>
            <div style={{ marginTop: '30px' }}>
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <p className="product-price">₹{item.price.toLocaleString()}</p>
                        </div>
                        <div className="cart-controls">
                            <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="total-price">Total: ₹{cartTotal.toLocaleString()}</div>
                <button className="btn-add" style={{ marginTop: '20px', padding: '15px 40px' }}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
