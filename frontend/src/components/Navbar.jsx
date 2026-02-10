import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <header>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Link to="/" className="logo">NAKSH JEWELS</Link>
                <nav className="nav-links">
                    <Link to="/">Shop</Link>
                    <Link to="/cart" className="cart-icon">
                        Cart
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
