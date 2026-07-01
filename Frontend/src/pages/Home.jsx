import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 8)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">

  {/* LEFT TEXT */}
  <div className="hero-text">
    <p className="tagline">WELCOME TO TRENDZY ✦</p>

    <h1>
      Shop the Latest <br />
      <span className="highlight">Trends</span> in Style
    </h1>

    <p className="subtitle">
      Discover amazing products, unbeatable deals, and a shopping experience like never before.
    </p>

    <Link to="/shop">
      <button className="shop-btn">
        Shop Now →
      </button>
    </Link>

    {/* FEATURES */}
    <div className="features">
      <div className="feature-box">
        <span>⭐</span>
        <div>
          <h4>Best Quality</h4>
          <p>Premium Products</p>
        </div>
      </div>

      <div className="feature-box">
        <span>🏷️</span>
        <div>
          <h4>Best Prices</h4>
          <p>Unbeatable Deals</p>
        </div>
      </div>

      <div className="feature-box">
        <span>🔒</span>
        <div>
          <h4>Secure Shopping</h4>
          <p>100% Safe & Secure</p>
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT IMAGE */}
  <div className="hero-image">
    <div className="bg-circle"></div>
    <div className="dot-grid dot-grid-left"></div>
    <div className="dot-grid dot-grid-right"></div>

    <img src="/hero-banner.png" alt="hero" />
  </div>
</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;