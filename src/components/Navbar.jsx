import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <span className="logo-text">Purple Market PH</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="navbar-menu">
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/shop" className="navbar-link">Shop</Link>
                        {isAuthenticated && (
                            <Link to="/orders" className="navbar-link">
                                <Package className="inline w-4 h-4 mr-1" />
                                My Orders
                            </Link>
                        )}
                        <Link to="/admin" className="navbar-link">Admin</Link>
                        <Link to="/cart" className="cart-link">
                            <ShoppingCart className="cart-icon" />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </Link>
                        {isAuthenticated ? (
                            <div className="user-menu">
                                <span className="user-name">
                                    <User className="inline w-4 h-4 mr-1" />
                                    {user?.name}
                                </span>
                                <button onClick={handleLogout} className="logout-btn">
                                    <LogOut className="inline w-4 h-4 mr-1" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="login-btn">Login</Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mobile-menu-button"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <Link to="/" className="mobile-menu-link" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link to="/shop" className="mobile-menu-link" onClick={() => setIsOpen(false)}>
                        Shop
                    </Link>
                    {isAuthenticated && (
                        <Link to="/orders" className="mobile-menu-link" onClick={() => setIsOpen(false)}>
                            My Orders
                        </Link>
                    )}
                    <Link to="/admin" className="mobile-menu-link" onClick={() => setIsOpen(false)}>
                        Admin
                    </Link>
                    <Link to="/cart" className="mobile-menu-link" onClick={() => setIsOpen(false)}>
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <div className="mobile-user-info">
                                Logged in as: <strong>{user?.name}</strong>
                            </div>
                            <button onClick={handleLogout} className="mobile-logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="mobile-menu-link" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
