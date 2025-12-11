import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';
import './shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, use env var for API URL
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback data if API fails (for demo robustness)
        setProducts([
          // 👕 Shirts
          {
            id: 1,
            name: 'Classic T-Shirt',
            price: 499,
            category: 'Shirts',
            description: 'Premium cotton crew neck t-shirt, perfect for everyday wear',
            image: 'C:/Users/Jen/.gemini/antigravity/brain/b39e02fc-ca35-4c66-bdd0-edf846ded299/white_tshirt_1765270607132.png',
            availableColors: [
              { name: 'White', hex: '#FFFFFF', image: 'C:/Users/Jen/.gemini/.../white_tshirt_1765270607132.png' },
              { name: 'Black', hex: '#000000', image: 'C:/Users/Jen/.gemini/.../black_tshirt_1765270626348.png' },
              { name: 'Navy', hex: '#001F3F', image: 'C:/Users/Jen/.gemini/.../navy_tshirt_1765271410186.png' }
            ]
          },
          {
            id: 5,
            name: 'Polo Shirt',
            price: 899,
            category: 'Shirts',
            description: 'Cotton polo shirt with collar, ideal for casual business wear',
            image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Navy', hex: '#001F3F', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=300&fit=crop' },
              { name: 'Red', hex: '#FF4136', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop' }
            ]
          },
          {
            id: 8,
            name: 'Casual Hoodie',
            price: 1199,
            category: 'Shirts',
            description: 'Comfortable fleece hoodie with kangaroo pocket and drawstring hood',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Grey', hex: '#AAAAAA', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop' },
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop' },
              { name: 'Navy', hex: '#001F3F', image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=400&h=300&fit=crop' }
            ]
          },

          // 👖 Pants
          {
            id: 3,
            name: 'Denim Jeans',
            price: 1299,
            category: 'Pants',
            description: 'Classic fit blue denim jeans with premium stretch fabric',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Blue', hex: '#0074D9', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop' },
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=300&fit=crop' },
              { name: 'Grey', hex: '#AAAAAA', image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=300&fit=crop' }
            ]
          },

          // 👟 Shoes
          {
            id: 2,
            name: 'Running Shoes',
            price: 2499,
            category: 'Shoes',
            description: 'Lightweight athletic shoes with cushioned sole for maximum comfort',
            image: 'C:/Users/Jen/.gemini/.../black_running_shoes_1765271427597.png',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'C:/Users/Jen/.gemini/.../black_running_shoes_1765271427597.png' },
              { name: 'Red', hex: '#FF4136', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
              { name: 'Blue', hex: '#0074D9', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop' }
            ]
          },
          {
            id: 4,
            name: 'Leather Sneakers',
            price: 3499,
            category: 'Shoes',
            description: 'Stylish leather sneakers with rubber sole, available in multiple colors',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Brown', hex: '#8B4513', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' },
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4a7c48f?w=400&h=300&fit=crop' }
            ]
          },
          {
            id: 9,
            name: 'Formal Dress Shoes',
            price: 3999,
            category: 'Shoes',
            description: 'Polished leather dress shoes perfect for formal occasions',
            image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=300&fit=crop' },
              { name: 'Brown', hex: '#8B4513', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=300&fit=crop' }
            ]
          },

          // 🎒 Bags
          {
            id: 6,
            name: 'Canvas Backpack',
            price: 1599,
            category: 'Bags',
            description: 'Durable canvas backpack with multiple compartments and laptop sleeve',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Khaki', hex: '#C3B091', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' },
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=300&fit=crop' },
              { name: 'Olive', hex: '#808000', image: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=400&h=300&fit=crop' }
            ]
          },

          // ⌚ Accessories
          {
            id: 7,
            name: 'Sports Watch',
            price: 4999,
            category: 'Accessories',
            description: 'Water-resistant sports watch with date display and stopwatch function',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'Silver', hex: '#C0C0C0', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          },

          // 🎨 Stationery
          {
            id: 8,
            name: 'Notebook',
            price: 1999,
            category: 'Stationery',
            description: 'Premium quality notebook with durable cover and high-quality paper',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          },

          // 🎨 Stationery
          {
            id: 8,
            name: 'Notebook',
            price: 1999,
            category: 'Stationery',
            description: 'Premium quality notebook with durable cover and high-quality paper',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          },

          // 🎨 Stationery
          {
            id: 8,
            name: 'Notebook',
            price: 1999,
            category: 'Stationery',
            description: 'Premium quality notebook with durable cover and high-quality paper',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          },

          // 🎨 Stationery
          {
            id: 8,
            name: 'Notebook',
            price: 1999,
            category: 'Stationery',
            description: 'Premium quality notebook with durable cover and high-quality paper',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          },

          // 🎨 Stationery
          {
            id: 8,
            name: 'Notebook',
            price: 1999,
            category: 'Stationery',
            description: 'Premium quality notebook with durable cover and high-quality paper',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          },

          // 🎨 Stationery
          {
            id: 8,
            name: 'Notebook',
            price: 1999,
            category: 'Stationery',
            description: 'Premium quality notebook with durable cover and high-quality paper',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            availableColors: [
              { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
              { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
            ]
          }
        ]); // Close the products array and setProducts call
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="text-3xl font-bold text-gray-900">Shop Our Collection</h1>
        <div className="search-bar-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="products-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card shimmer"></div>
          ))}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;

