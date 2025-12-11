import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, DollarSign, ShoppingBag, Users } from 'lucide-react';
import './admindashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/analytics');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                // Mock data fallback
                setStats({
                    totalRevenue: 15000,
                    totalOrders: 12,
                    topSelling: [
                        { name: 'Logo Design', sales: 5 },
                        { name: 'SEO Audit', sales: 3 }
                    ],
                    recentOrders: [
                        { id: 101, customer: 'John Doe', total: 1500, status: 'Paid' },
                        { id: 102, customer: 'Jane Smith', total: 3000, status: 'Paid' }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="dashboard-loading">Loading dashboard...</div>;

    return (
        <div className="dashboard-container">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-revenue">
                    <div className="stat-icon">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="stat-label">Total Revenue</p>
                        <p className="stat-value">₱{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card stat-orders">
                    <div className="stat-icon">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="stat-label">Total Orders</p>
                        <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                </div>
                <div className="stat-card stat-services">
                    <div className="stat-icon">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="stat-label">Active Services</p>
                        <p className="stat-value">3</p>
                    </div>
                </div>
            </div>

            {/* Recent Orders & Top Products */}
            <div className="dashboard-grid">
                {/* Recent Orders */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Recent Orders</h2>
                    </div>
                    <div className="card-content">
                        <table className="dashboard-table">
                            <thead>
                                <tr className="table-header-row">
                                    <th className="table-header">Order ID</th>
                                    <th className="table-header">Customer</th>
                                    <th className="table-header">Status</th>
                                    <th className="table-header text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentOrders.map(order => (
                                    <tr key={order.id} className="table-row">
                                        <td className="table-cell">#{order.id}</td>
                                        <td className="table-cell">{order.customer}</td>
                                        <td className="table-cell">
                                            <span className="status-badge">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="table-cell text-right font-medium">₱{order.total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Selling */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Top Selling Services</h2>
                    </div>
                    <div className="card-content">
                        {stats.topSelling.map((item, index) => (
                            <div key={index} className="top-item">
                                <div className="top-item-info">
                                    <div className="rank-badge">
                                        {index + 1}
                                    </div>
                                    <span className="top-item-name">{item.name}</span>
                                </div>
                                <span className="top-item-sales">{item.sales} sales</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

