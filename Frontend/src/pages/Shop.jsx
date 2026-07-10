import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const selectedCategory = queryParams.get("category");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(

    (p) => {
      const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
      const categoryMatch = !selectedCategory || p.category
    .split(",")
    .map(c => c.trim())
    .includes(selectedCategory);
      return searchMatch && categoryMatch;
    }
  );

  return (
    <div className="shop-container">
      <h2>{selectedCategory
    ? `${selectedCategory} Products`
    : "All Products"}</h2>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;