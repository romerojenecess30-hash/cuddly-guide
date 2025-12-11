import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Sparkles } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [displayedImage, setDisplayedImage] = useState(product.image);

    // Determine available sizes based on category
    const getSizeOptions = () => {
        const category = product.category.toLowerCase();
        if (category === 'shirts' || category === 'pants') {
            return ['S', 'M', 'L', 'XL', 'XXL'];
        } else if (category === 'shoes') {
            return ['7', '8', '9', '10', '11', '12'];
        } else {
            return ['S', 'M', 'L', 'XL'];
        }
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color.name);
        // Update image to match selected color
        if (color.image) {
            setDisplayedImage(color.image);
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        if (!selectedColor) {
            alert('Please select a color');
            return;
        }
        addToCart({ ...product, size: selectedSize, color: selectedColor });
        setSelectedSize(''); // Reset after adding
        setSelectedColor(''); // Reset after adding
        setDisplayedImage(product.image); // Reset to default image
    };

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={displayedImage}
                    alt={product.name}
                    className="product-image"
                    key={displayedImage}
                />
                <div className="image-overlay">
                    <Sparkles className="sparkle-icon" />
                </div>
            </div>
            <div className="product-content">
                <div className="product-header">
                    <span className="category-badge">
                        {product.category}
                    </span>
                    <span className="product-price">₱{product.price.toLocaleString()}</span>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                {/* Color Selector */}
                <div className="color-selector-wrapper">
                    <label className="color-label">Color:</label>
                    <div className="color-swatches">
                        {product.availableColors?.map(color => (
                            <button
                                key={color.name}
                                type="button"
                                className={`color-swatch ${selectedColor === color.name ? 'selected' : ''}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => handleColorSelect(color)}
                                title={color.name}
                                aria-label={`Select ${color.name}`}
                            >
                                {selectedColor === color.name && <span className="check-mark">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size Selector */}
                <div className="size-selector-wrapper">
                    <label className="size-label">Size:</label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="size-select"
                    >
                        <option value="">Select Size</option>
                        {getSizeOptions().map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="add-to-cart-btn"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

