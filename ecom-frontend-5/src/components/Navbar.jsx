import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navbarRef = useRef(null);

  // for 3D brand hover effect
  const [isBrandHover, setIsBrandHover] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      // backend mapping is @GetMapping("/product")
      const response = await axios.get(`${baseUrl}/api/product`);
      console.log(response.data, "navbar initial data");
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleNavbarToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLinkClick = () => {
    setIsNavCollapsed(true);
  };

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    setShowNoProductsMessage(false);
    setIsLoading(true);
    setIsNavCollapsed(true);

    try {
      // backend mapping is @GetMapping("/product/search")
      const response = await axios.get(
        `${baseUrl}/api/product/search?keyword=${input}`
      );
      setSearchResults(response.data);

      if (response.data.length === 0) {
        setNoResults(true);
        setShowNoProductsMessage(true);
      } else {
        navigate(`/search-results`, { state: { searchData: response.data } });
      }

      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error searching:", error);
      setShowNoProductsMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    setIsNavCollapsed(true);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  // ===== INLINE STYLES FOR 3D EFFECTS =====
  const navbarStyle = {
    background:
      theme === "dark-theme"
        ? "linear-gradient(135deg, rgba(10,10,10,0.96), rgba(35,35,35,0.96))"
        : "linear-gradient(120deg, rgba(255,255,255,0.96), rgba(240,246,255,0.98))",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom:
      theme === "dark-theme"
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(0,0,0,0.06)",
    boxShadow:
      theme === "dark-theme"
        ? "0 10px 25px rgba(0,0,0,0.65)"
        : "0 10px 25px rgba(15,23,42,0.18)",
    transition: "background 0.2s ease, box-shadow 0.2s ease",
  };

  const brandWrapperStyle = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    cursor: "pointer",
  };

  const brandIconStyle = {
    width: 44,
    height: 44,
    borderRadius: 18,
    background:
      "linear-gradient(135deg, #ff8a00 0%, #ff3d81 40%, #7f5dff 100%)",
    boxShadow: isBrandHover
      ? "0 16px 28px rgba(0,0,0,0.55), inset 0 2px 4px rgba(255,255,255,0.65)"
      : "0 10px 18px rgba(0,0,0,0.45), inset 0 2px 4px rgba(255,255,255,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: isBrandHover ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const brandLetterStyle = {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: "1.3rem",
    letterSpacing: "1px",
    textShadow: "0 2px 4px rgba(0,0,0,0.45)",
  };

  const brandTextContainerStyle = {
    marginLeft: "0.6rem",
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.1,
  };

  const brandTitleStyle = {
    fontWeight: 700,
    fontSize: "1.15rem",
    color: theme === "dark-theme" ? "#f9fafb" : "#111827",
  };

  const brandSubtitleStyle = {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.16rem",
    color: theme === "dark-theme" ? "#9ca3af" : "#6b7280",
  };

  const cartIconWrapperStyle = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  };

  const cartBubbleStyle = {
    width: 36,
    height: 36,
    borderRadius: "999px",
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "0 9px 16px rgba(37,99,235,0.7), inset 0 2px 3px rgba(255,255,255,0.5)",
    color: "#ffffff",
    marginRight: 4,
  };

  const cartTextStyle = {
    color: theme === "dark-theme" ? "#e5e7eb" : "#111827",
    fontWeight: 500,
  };

  const searchInputStyle = {
    borderRadius: 999,
    border: "1px solid rgba(148,163,184,0.7)",
    boxShadow: "0 4px 10px rgba(15,23,42,0.18)",
    fontSize: "0.9rem",
  };

  const searchButtonStyle = {
    borderRadius: 999,
    boxShadow: "0 4px 10px rgba(15,23,42,0.18)",
  };

  const themeButtonStyle = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background:
      theme === "dark-theme"
        ? "radial-gradient(circle at 30% 20%, #4b5563, #020617)"
        : "radial-gradient(circle at 30% 20%, #ffffff, #dbeafe)",
    boxShadow:
      theme === "dark-theme"
        ? "0 8px 16px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.15)"
        : "0 8px 16px rgba(15,23,42,0.35), inset 0 1px 2px rgba(255,255,255,0.8)",
    color: theme === "dark-theme" ? "#facc15" : "#0f172a",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      ref={navbarRef}
      style={navbarStyle}
    >
      <div className="container-fluid">
        {/* Brand with 3D icon */}
        <a
          href="/"
          className="navbar-brand"
          onClick={handleLinkClick}
          style={brandWrapperStyle}
          onMouseEnter={() => setIsBrandHover(true)}
          onMouseLeave={() => setIsBrandHover(false)}
        >
          <div style={brandIconStyle}>
            {/* U = Urbankart, you can change letter if you want */}
            <span style={brandLetterStyle}>U</span>
          </div>
          <div style={brandTextContainerStyle}>
            <span style={brandTitleStyle}>Urbankart</span>
            <span style={brandSubtitleStyle}>Urban • smart • shop</span>
          </div>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        

          style={{
            backgroundColor:"#cbcbcb",
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.8)",
            padding: "0.25rem 0.6rem",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/"
                onClick={handleLinkClick}
                style={{color: theme === "dark-theme" ? "#fdfbd4" : "#271e11ff"}}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/add_product"
                onClick={handleLinkClick}
                style={{color: theme === "dark-theme" ? "#fdfbd4" : "#271e11ff"}}

              >
                Add Product
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/orders"
                onClick={handleLinkClick}
                                style={{color: theme === "dark-theme" ? "#fdfbd4" : "#271e11ff"}}

              >
                Orders
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Theme toggle 3D button */}
            <button
              type="button"
              onClick={toggleTheme}
              style={themeButtonStyle}
            >
              {theme === "dark-theme" ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-stars-fill"></i>
              )}
            </button>

            {/* Cart with 3D bubble */}
            <a
              href="/cart"
              className="nav-link text-dark me-3"
              onClick={handleLinkClick}
              style={cartIconWrapperStyle}
            >
              <div style={cartBubbleStyle}>
                <i className="bi bi-cart3" style={{ color: "#ffffff" }}></i>
              </div>
              <span style={cartTextStyle}>Cart</span>
            </a>

            {/* Search */}
            <form
              className="d-flex"
              role="search"
              onSubmit={handleSubmit}
              id="searchForm"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Type to search"
                aria-label="Search"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                style={searchInputStyle}
              />
              {isLoading ? (
                <button
                  className="btn btn-outline-success"
                  type="button"
                  disabled
                  style={searchButtonStyle}
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Loading...</span>
                </button>
              ) : (
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  style={searchButtonStyle}
                >
                  Search
                </button>
              )}
            </form>

            {showNoProductsMessage && (
              <div
                className="alert alert-warning position-absolute mt-2"
                style={{ top: "100%", right: "1rem", zIndex: 1000 }}
              >
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
