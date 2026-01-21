import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Nav.css"
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, removeUser } = useAuth();

  const handleLogout = () => {
    removeUser();
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to='/'>
          <img src="/logo3.png" alt="Logo" />
        </Link>
      </div>

      <div className="profile-section">
        {user ? (
          <>
            <p>Hello, {user.username}</p>
            <button className="button" onClick={handleLogout}>Logout</button>
            <button className="button" onClick={() => navigate("/profile")}>Profile</button>
          </>
        ) : (
          <button className="button" onClick={() => navigate("/signin")}>Sign in</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;