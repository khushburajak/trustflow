import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">TrustFlow</Link>
      </div>
      <div className="nav-links">
        <Link to="/products">Browse Products</Link>
        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin/products">Manage Products</Link>
                <Link to="/admin/reviews">Manage Reviews</Link>
                <Link to="/admin/users">Manage Users</Link>
              </>
            ) : (
              <>
                <Link to="/my-reviews">My Reviews</Link>
                <Link to="/saved-products">Saved Products</Link>
                <Link to="/settings">Settings</Link>
              </>
            )}
            <button onClick={logout}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;