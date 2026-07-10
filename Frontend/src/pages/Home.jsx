import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/api/products/testimonials")
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);
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
      <div className="hero-glow"></div>
  {/* LEFT TEXT */}
  <div className="hero-text">
    <p className="tagline">PREMIUM FASHION STORE ✦</p>

    <h1>
      Shop the Latest <br />
      <span className="highlight">Trends</span> in Style
    </h1>

    <p className="subtitle">
      Discover premium fashion, trending styles, exclusive offers, and secure shopping — all in one place.
    </p>

    <Link to="/shop">
      <button className="shop-btn">
        Shop Now →
      </button>
    </Link>
    <div className="hero-stats">
      <div>
        <h3>500+</h3>
        <p>Products</p>
      </div>

      <div>
        <h3>10K+</h3>
        <p>Customers</p>
      </div>

      <div>
        <h3>99%</h3>
        <p>Satisfaction</p>
      </div>
</div>

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
      <div className="categories-section">
  <h2>Shop by Category</h2>

  <div className="categories-grid">
    <Link to="/shop?category=Women" className="category-card">
      👗 Women
    </Link>

    <Link to="/shop?category=Men" className="category-card">
      👔 Men
    </Link>

    <Link to="/shop?category=Shoes" className="category-card">
      👟 Shoes
    </Link>

    <Link to="/shop?category=Accessories" className="category-card">
      ⌚ Accessories
    </Link>
  </div>
</div>
      <div className="section-header">
      <h2>🔥 Trending Products</h2>
      <p>Handpicked products loved by our customers</p>
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

          {Array.isArray(testimonials) &&
  testimonials.map((item, index) => (
        <div className="testimonial-grid">
      <div className="testimonial-card" key={index}>
    <div className="testimonial-product">
      {item.productName}
    </div>

    <div className="testimonial-rating">
      {"⭐".repeat(item.rating)}
    </div>

    <p className="testimonial-comment">
      "{item.comment}"
    </p>

    <h4 className="testimonial-user">
      — {item.name}
    </h4>
    </div>
    </div>
))}
  </div>
  );
};

export default Home;