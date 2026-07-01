import React, { useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);

   const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/TrendZylogo.png" alt="TrendZy" style={{ marginTop: '3px', height: '55px', width: '70px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }} />
          <h3> <span style={{ color: "#fff" }}>Trend</span><span style={{ color: "#f97316" }}>Z</span><span style={{ color: "#fff" }}>y</span></h3>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">Hi, {user.name}</Link></li>
            {
            user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;