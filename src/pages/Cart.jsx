import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import './cart.css';

const Cart = () => {
    const { cart, removeFromCart, total } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-icon">
                    <ShoppingBag className="w-20 h-20" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any products yet.</p>
                <Link to="/shop" className="browse-services-btn">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="cart-card">
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="cart-item-info">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div>
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-category">{item.category}</p>
                                    <p className="cart-item-variant">
                                        <span className="variant-label">Color:</span> <strong>{item.color}</strong> |
                                        <span className="variant-label"> Size:</span> <strong>{item.size}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="cart-item-actions">
                                <div className="cart-item-details">
                                    <p className="cart-item-price">₱{item.price.toLocaleString()}</p>
                                    <p className="cart-item-qty">Qty: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                                    className="remove-btn"
                                    aria-label="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-total-section">
                    <div className="cart-total">
                        <span className="total-label">Total</span>
                        <span className="total-amount">₱{total.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="checkout-btn"
                    >
                        Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

