import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../pages/shop/CartModal.jsx";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import { selectCartCount } from "../redux/features/Cart/CartSlice.jsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector(selectCartCount) || 0;

  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {}
    dispatch(logout());
    setIsDropDownOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/">Pages</Link>
          </li>
        </ul>

        <div className="nav__logo">
          <Link to="/">NGU-TOP<span>.</span></Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>

          <span>
            <button onClick={() => setIsCartOpen(true)} className="hover:text-primary relative">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {count}
              </sup>
            </button>
          </span>

          <span>
            {user ? (
              <>
                <img
                  onClick={() => setIsDropDownOpen((v) => !v)}
                  src={user?.profileImage || avatarImg}
                  alt="avatar"
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-3 p-1">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left dropdown-items"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Navbar;
