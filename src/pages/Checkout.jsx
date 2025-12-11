import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { CreditCard, Smartphone, CheckCircle, Banknote } from 'lucide-react';
import './checkout.css';

const Checkout = () => {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        paymentMethod: 'gcash'
    });
    const [loading, setLoading] = useState(false);

    if (cart.length === 0) {
        navigate('/shop');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call to create order
            await axios.post('http://localhost:5000/api/orders', {
                items: cart,
                total,
                customer: formData.name,
                customerEmail: formData.email,
                paymentMethod: formData.paymentMethod
            });

            // Simulate payment processing delay
            setTimeout(() => {
                alert(`Payment successful via ${formData.paymentMethod.toUpperCase()}! Order placed.`);
                clearCart();
                navigate('/'); // Redirect to home or order success page
            }, 1500);

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <form onSubmit={handleSubmit} className="checkout-form">

                {/* Customer Info */}
                <div className="form-section">
                    <h2 className="section-title">Contact Information</h2>
                    <div className="form-fields">
                        <div className="form-field">
                            <label className="field-label">Full Name</label>
                            <input
                                type="text"
                                required
                                className="field-input"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-field">
                            <label className="field-label">Email</label>
                            <input
                                type="email"
                                required
                                className="field-input"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-field">
                            <label className="field-label">Phone Number</label>
                            <input
                                type="tel"
                                required
                                className="field-input"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="form-section">
                    <h2 className="section-title">Payment Method</h2>
                    <div className="payment-methods">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'gcash' })}
                            className={`payment-option ${formData.paymentMethod === 'gcash' ? 'active gcash' : ''}`}
                        >
                            <Smartphone className="payment-icon" />
                            <span className="payment-label">GCash</span>
                            {formData.paymentMethod === 'gcash' && <CheckCircle className="check-icon" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'paymaya' })}
                            className={`payment-option ${formData.paymentMethod === 'paymaya' ? 'active paymaya' : ''}`}
                        >
                            <Smartphone className="payment-icon" />
                            <span className="payment-label">PayMaya</span>
                            {formData.paymentMethod === 'paymaya' && <CheckCircle className="check-icon" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                            className={`payment-option ${formData.paymentMethod === 'card' ? 'active card' : ''}`}
                        >
                            <CreditCard className="payment-icon" />
                            <span className="payment-label">Card</span>
                            {formData.paymentMethod === 'card' && <CheckCircle className="check-icon" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                            className={`payment-option ${formData.paymentMethod === 'cod' ? 'active cod' : ''}`}
                        >
                            <Banknote className="payment-icon" />
                            <span className="payment-label">Cash on Delivery</span>
                            {formData.paymentMethod === 'cod' && <CheckCircle className="check-icon" />}
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <div className="summary-total">
                        <span className="summary-label">Total Amount</span>
                        <span className="summary-amount">₱{total.toLocaleString()}</span>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-btn"
                    >
                        {loading ? (
                            <>
                                <div className="spinner"></div>
                                Processing...
                            </>
                        ) : (
                            `Pay ₱${total.toLocaleString()}`
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;

