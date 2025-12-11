import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Calendar, Truck, MapPin } from 'lucide-react';
import './orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Processing': 'status-processing',
            'Shipped': 'status-shipped',
            'Out for Delivery': 'status-delivery',
            'Delivered': 'status-delivered'
        };
        return colors[status] || 'status-processing';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="orders-container">
                <h1 className="orders-title">My Orders</h1>
                <div className="loading-state">
                    <div className="spinner-large"></div>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-container">
                <h1 className="orders-title">My Orders</h1>
                <div className="empty-state">
                    <Package className="empty-icon" />
                    <h2>No orders yet</h2>
                    <p>Start shopping to see your orders here!</p>
                    <a href="/shop" className="shop-btn">Browse Products</a>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h1 className="orders-title">My Orders</h1>
            <p className="orders-subtitle">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>

            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        {/* Order Header */}
                        <div className="order-header">
                            <div className="order-header-left">
                                <h3 className="order-number">Order #{order.id}</h3>
                                <span className={`status-badge ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="order-header-right">
                                <p className="tracking-number">
                                    <Package className="inline-icon" />
                                    {order.trackingNumber}
                                </p>
                            </div>
                        </div>

                        {/* Order Dates */}
                        <div className="order-dates">
                            <div className="date-item">
                                <Calendar className="date-icon" />
                                <div>
                                    <p className="date-label">Order Date</p>
                                    <p className="date-value">{formatDate(order.orderDate)}</p>
                                </div>
                            </div>
                            <div className="date-item">
                                <Truck className="date-icon" />
                                <div>
                                    <p className="date-label">Estimated Delivery</p>
                                    <p className="date-value">{formatDate(order.deliveryDate)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="order-products">
                            <h4 className="products-title">Items ({order.items.length})</h4>
                            <div className="products-grid">
                                {order.items.map((item, index) => (
                                    <div key={index} className="product-item">
                                        <img
                                            src={item.selectedColor?.image || item.image}
                                            alt={item.name}
                                            className="product-image"
                                            onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Product' }}
                                        />
                                        <div className="product-details">
                                            <p className="product-name">{item.name}</p>
                                            <p className="product-meta">
                                                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                                {item.selectedColor && <span>Color: {item.selectedColor.name}</span>}
                                            </p>
                                            <p className="product-qty">Qty: {item.quantity}</p>
                                            <p className="product-price">₱{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Footer */}
                        <div className="order-footer">
                            <div className="payment-method">
                                <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
                                {order.customer && <p><strong>Customer:</strong> {order.customer}</p>}
                            </div>
                            <div className="order-total">
                                <p className="total-label">Total Amount</p>
                                <p className="total-amount">₱{order.total.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
