import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './home.css';

const Home = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Shop the Latest Fashion Trends
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100">
                    Discover quality clothing, footwear, and accessories with fast shipping and secure payments.
                </p>
                <Link to="/shop" className="hero-button">
                    Browse Products <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 px-4">
                <div className="feature-card">
                    <div className="feature-icon bg-green-100">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                    <p className="text-gray-600">Multiple payment options including GCash, PayMaya, and credit cards.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon bg-blue-100">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                    <p className="text-gray-600">Quick delivery across the Philippines with order tracking.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon bg-purple-100">
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                    <p className="text-gray-600">Carefully curated selection of premium clothing and accessories.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
