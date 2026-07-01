import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const AddProduct = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ FIX: redirect safely inside useEffect
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: data
      });

      const responseData = await res.json();

      if (res.ok) {
        alert('Product created successfully!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      background: '#18181b',
      padding: '40px',
      borderRadius: '12px'
    }}>
      <h2 style={{ color: '#f97316' }}>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Stock"
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;