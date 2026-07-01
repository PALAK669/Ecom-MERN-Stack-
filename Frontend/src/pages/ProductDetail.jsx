import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/product.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const user = useSelector((state) => state.auth.user);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ADD TO CART
  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        countInStock: product.countInStock,
        qty: 1,
      })
    );

    alert("Added to cart!");
  };

  // SUBMIT REVIEW
  
   const handleReview = async (star) => {
  try {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!comment.trim()) {
      alert("Please write comment");
      return;
    }

    const res = await fetch(`/api/products/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // ✅ IMPORTANT FIX
      },
      body: JSON.stringify({
        rating: star,
        comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    setProduct(data);
    setRating(star);
    setComment("");
  } catch (err) {
    console.log(err);
  }
};

  // LOADING
  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "100px", color: "#f97316" }}>
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", margin: "100px", color: "#ef4444" }}>
        Product Not Found
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      {/* Breadcrumb */}
      <div style={{ marginBottom: "20px", color: "#a1a1aa" }}>
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        {product.category} / <span style={{ color: "#fff" }}>{product.name}</span>
      </div>

      <div style={{ display: "flex", gap: "40px" }}>
        
        {/* IMAGE */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: "400px", borderRadius: "10px" }}
          />
        </div>

        {/* INFO */}
        <div style={{ flex: 1 }}>
          <h2>{product.name}</h2>

          <p style={{ fontSize: "24px", color: "#f97316" }}>
            ₹{product.price}
          </p>

          <p>{product.description}</p>

          <button onClick={handleAddToCart} className="btn">
            Add to Cart
          </button>

          <p style={{ marginTop: "20px" }}>
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          {/* ⭐ STARS */}
          <div style={{ marginTop: "20px" }}>
            <h3>Rate Product</h3>

            <div style={{ fontSize: "30px", display: "flex", gap: "5px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleReview(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    cursor: "pointer",
                    color: (hover || rating) >= star ? "#facc15" : "#555",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* COMMENT */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write comment..."
              style={{
                width: "65%",
                height: "200px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #333",
                background: "#18181b",
                color: "#fff",
                fontSize: "16px",
                
              }}
            />
          </div>

          {/* REVIEWS */}
          <div style={{ marginTop: "30px" }}>
            <h3>Reviews</h3>

            {product.reviews?.length === 0 && <p>No reviews yet</p>}

            {product.reviews?.map((r, i) => (
              <div key={i} style={{ borderBottom: "1px solid #333", padding: "10px" }}>
                <p style={{ color: "#facc15" }}>
                  {"★".repeat(r.rating)}
                </p>
                <p><b>{r.name}</b></p>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;