import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    console.log(data, "data from home page");
  }, [data]);

  useEffect(() => {
    let toastTimer;
    if (showToast) {
      toastTimer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(toastTimer);
  }, [showToast]);

  // Convert base64 string to data URL
  const convertBase64ToDataURL = (base64String, mimeType = "image/jpeg") => {
    if (!base64String) return unplugged;

    if (base64String.startsWith("data:")) {
      return base64String;
    }

    if (base64String.startsWith("http")) {
      return base64String;
    }

    return `data:${mimeType};base64,${base64String}`;
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    setToastProduct(product);
    setShowToast(true);
  };

  const filteredProducts = selectedCategory
    ? data.filter((product) => product.category === selectedCategory)
    : data;

  // ===================== INLINE 3D / AESTHETIC STYLES =====================

  const pageWrapperStyle = {
    minHeight: "100vh",
    paddingTop: "96px",
    paddingBottom: "40px",
    background:
      "radial-gradient(circle at top left, #020617 0, #020617 35%, #000000 100%)",
    position: "relative",
    overflow: "visible",
  };

  const orbBase = {
    position: "absolute",
    borderRadius: "999px",
    filter: "blur(32px)",
    opacity: 0.55,
    pointerEvents: "none",
  };

  const orbOneStyle = {
    ...orbBase,
    width: "260px",
    height: "260px",
    top: "40px",
    left: "-60px",
    background: "radial-gradient(circle, rgba(59,130,246,0.8), transparent)",
  };

  const orbTwoStyle = {
    ...orbBase,
    width: "260px",
    height: "260px",
    bottom: "-40px",
    right: "-40px",
    background: "radial-gradient(circle, rgba(16,185,129,0.8), transparent)",
  };

  const toastWrapperStyle = {
    zIndex: 1050,
    transform: showToast ? "translateY(0)" : "translateY(-15px)",
    transition: "transform 0.16s ease-out",
  };

  const toastCardStyle = {
    minWidth: "280px",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow:
      "0 20px 50px rgba(15,23,42,0.95), 0 0 0 1px rgba(34,197,94,0.5)",
    background:
      "linear-gradient(135deg, rgba(6,95,70,0.9), rgba(21,128,61,0.96))",
    border: "none",
    transform: showToast ? "scale(1)" : "scale(0.96)",
    transition: "transform 0.16s ease-out",
  };

  const toastHeaderStyle = {
    borderBottom: "1px solid rgba(22,163,74,0.7)",
    padding: "8px 12px",
  };

  const toastBodyStyle = {
    background:
      "radial-gradient(circle at 0 0, rgba(34,197,94,0.25), rgba(15,23,42,1))",
    color: "#e5e7eb",
  };

  const heroWrapperStyle = {
    marginBottom: "22px",
    position: "relative",
    zIndex: 1,
  };

  const heroCardStyle = {
    borderRadius: "26px",
    padding: "18px 16px 18px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(37,99,235,0.9))",
    border: "1px solid rgba(96,165,250,0.6)",
    boxShadow:
      "0 26px 55px rgba(15,23,42,1), 0 0 0 1px rgba(37,99,235,0.8)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  };

  const heroGlowBarStyle = {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 10% 0, rgba(129,140,248,0.35), transparent 55%)",
    opacity: 0.9,
    pointerEvents: "none",
  };

  const heroTitleStyle = {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#e5e7eb",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  const heroSubtitleStyle = {
    marginTop: "4px",
    fontSize: "0.85rem",
    color: "#cbd5f5",
  };

  const heroBadgeRowStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
    flexWrap: "wrap",
  };

  const heroBadgeStyle = {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    border: "1px solid rgba(191,219,254,0.8)",
    color: "#e5e7eb",
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(129,140,248,0.28))",
    backdropFilter: "blur(10px)",
  };

  const heroStatPillStyle = {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "0.8rem",
    color: "#e5e7eb",
    border: "1px solid rgba(56,189,248,0.8)",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.45), rgba(15,23,42,0.98))",
    boxShadow: "0 0 18px rgba(56,189,248,0.6)",
  };

  const heroStatLabelStyle = {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#bfdbfe",
  };

  const heroStatValueStyle = {
    fontSize: "1rem",
    fontWeight: 700,
  };

  const productGridStyle = {
    marginTop: "6px",
    position: "relative",
    zIndex: 1,
  };

  const columnWrapperStyle = {
    perspective: "1000px",
  };

  const cardBaseStyle = (isHovered, disabled) => ({
    borderRadius: "22px",
    border: "1px solid rgba(30,64,175,0.75)",
    background: disabled
      ? "linear-gradient(145deg, #020617, #020617)"
      : "radial-gradient(circle at 0 0, rgba(59,130,246,0.3), #020617)",
    boxShadow: isHovered
      ? "0 32px 80px rgba(15,23,42,1), 0 0 0 1px rgba(59,130,246,0.9)"
      : "0 22px 55px rgba(15,23,42,0.95), 0 0 0 1px rgba(30,64,175,0.7)",
    transform: isHovered
      ? "translateY(-8px) scale(1.02) rotateX(2deg) rotateY(-2deg)"
      : "translateY(0) scale(1)",
    transformStyle: "preserve-3d",
    transition:
      "transform 0.16s ease-out, box-shadow 0.16s ease-out, border-color 0.16s ease-out",
    overflow: "hidden",
    position: "relative",
  });

  const cardLightStripeStyle = {
    position: "absolute",
    inset: "0 -40%",
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.1), transparent 40%, transparent 60%, rgba(255,255,255,0.12))",
    opacity: 0.0,
    pointerEvents: "none",
  };

  const cardLightStripeHoveredStyle = {
    opacity: 0.4,
  };

  const imageWrapperStyle = {
    padding: "10px 10px 0 10px",
  };

  const imageStyle = {
    height: "180px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "18px",
    boxShadow: "0 18px 40px rgba(15,23,42,1)",
    transform: "translateZ(12px)",
  };

  const cardBodyStyle = {
    padding: "12px 14px 16px",
    display: "flex",
    flexDirection: "column",
    transform: "translateZ(16px)",
  };

  const productNameStyle = {
    fontSize: "0.98rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "#e5e7eb",
  };

  const brandStyle = {
    fontSize: "0.8rem",
    color: "#9ca3af",
    fontStyle: "italic",
  };

  const dividerStyle = {
    borderTop: "1px solid rgba(55,65,81,0.8)",
    margin: "10px 0",
  };

  const priceRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  };

  const priceStyle = {
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  };

  const rupeeIconStyle = {
    fontSize: "1rem",
  };

  const stockBadgeStyle = (outOfStock, isHovered) => ({
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    border: outOfStock
      ? "1px solid rgba(239,68,68,0.9)"
      : "1px solid rgba(52,211,153,0.9)",
    color: outOfStock ? "#fecaca" : "#bbf7d0",
    background: outOfStock
      ? "linear-gradient(135deg, rgba(127,29,29,0.85), rgba(248,113,113,0.25))"
      : "radial-gradient(circle at 0 0, rgba(34,197,94,0.55), rgba(15,23,42,1))",
    boxShadow: isHovered
      ? outOfStock
        ? "0 0 16px rgba(248,113,113,0.7)"
        : "0 0 16px rgba(34,197,94,0.9)"
      : "none",
    transition: "box-shadow 0.16s ease-out, transform 0.16s ease-out",
    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
  });

  const buttonStyle = (disabled, isHoveredCard) => ({
    width: "100%",
    borderRadius: "999px",
    padding: "9px 0",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "none",
    color: disabled ? "#9ca3af" : "#e5e7eb",
    background: disabled
      ? "linear-gradient(135deg, #4b5563, #374151)"
      : "linear-gradient(135deg, #2563eb, #4f46e5)",
    boxShadow: disabled
      ? "0 0 0 rgba(0,0,0,0)"
      : isHoveredCard
      ? "0 20px 40px rgba(37,99,235,1)"
      : "0 16px 30px rgba(37,99,235,0.9)",
    cursor: disabled ? "not-allowed" : "pointer",
    transform: disabled
      ? "translateY(0)"
      : isHoveredCard
      ? "translateY(-1px) scale(1.01)"
      : "translateY(0)",
    transition:
      "transform 0.14s ease-out, box-shadow 0.14s ease-out, background 0.14s ease-out",
  });

  const emptyStateWrapperStyle = {
    height: "60vh",
  };

  const emptyCardStyle = {
    borderRadius: "24px",
    padding: "26px 24px",
    background:
      "radial-gradient(circle at 0 0, rgba(59,130,246,0.18), rgba(15,23,42,1))",
    border: "1px solid rgba(55,65,81,0.85)",
    boxShadow: "0 22px 50px rgba(15,23,42,1)",
    color: "#e5e7eb",
  };

  if (isError) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#020617" }}
      >
        <div className="text-center">
          <img
            src={unplugged}
            alt="Error"
            className="img-fluid"
            width="120"
            style={{
              filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.85))",
            }}
          />
          <h4 className="mt-3" style={{ color: "#e5e7eb" }}>
            Something went wrong
          </h4>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification */}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={toastWrapperStyle}
      >
        <div
          className={`toast ${showToast ? "show" : "hide"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={toastCardStyle}
        >
          <div
            className="toast-header bg-success text-white"
            style={toastHeaderStyle}
          >
            <strong className="me-auto" style={{ fontSize: "0.9rem" }}>
              Added to Cart
            </strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body" style={toastBodyStyle}>
            {toastProduct && (
              <div className="d-flex align-items-center">
                <img
                  src={convertBase64ToDataURL(toastProduct.imageData)}
                  alt={toastProduct.name}
                  className="me-2 rounded"
                  width="40"
                  height="40"
                  style={{
                    objectFit: "cover",
                    boxShadow: "0 12px 25px rgba(15,23,42,1)",
                  }}
                  onError={(e) => {
                    e.target.src = unplugged;
                  }}
                />
                <div>
                  <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                    {toastProduct.name}
                  </div>
                  <small style={{ fontSize: "0.75rem", color: "#d1fae5" }}>
                    Successfully added to your cart!
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid + Hero Header */}
      <div className="container" style={pageWrapperStyle}>
        {/* Background Orbs */}
        <div style={orbOneStyle} />
        <div style={orbTwoStyle} />

        {/* Hero */}
        <div style={heroWrapperStyle}>
          <div style={heroCardStyle}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={heroTitleStyle}>Discover Your Next Pick</div>
              <div style={heroSubtitleStyle}>
                Curated products with a futuristic touch. Scroll, hover, and
                explore.
              </div>
              <div style={heroBadgeRowStyle}>
                <span style={heroBadgeStyle}>
                  {selectedCategory
                    ? `Category: ${selectedCategory}`
                    : "All Categories"}
                </span>
                <span style={heroBadgeStyle}>
                  {filteredProducts.length} item
                  {filteredProducts.length !== 1 ? "s" : ""} visible
                </span>
              </div>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={heroStatPillStyle}>
                <div style={heroStatLabelStyle}>In your store</div>
                <div style={heroStatValueStyle}>{data.length}</div>
              </div>
            </div>
            <div style={heroGlowBarStyle} />
          </div>
        </div>

        {/* Grid */}
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
          style={productGridStyle}
        >
          {!filteredProducts || filteredProducts.length === 0 ? (
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              style={emptyStateWrapperStyle}
            >
              <div style={emptyCardStyle}>
                <h4 className="mb-2">No Products Available</h4>
                <p
                  className="mb-0"
                  style={{ fontSize: "0.9rem", color: "#9ca3af" }}
                >
                  Try adding new products from the admin panel or switch the
                  category filter.
                </p>
              </div>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const {
                id,
                brand,
                name,
                price,
                productAvailable,
                imageData,
                stockQuantity,
              } = product;

              const outOfStock = !productAvailable || stockQuantity === 0;
              const isHovered = hoveredId === id;

              return (
                <div className="col" key={id} style={columnWrapperStyle}>
                  <div
                    className="card h-100 shadow-sm"
                    style={cardBaseStyle(isHovered, outOfStock)}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* glowing stripe overlay */}
                    <div
                      style={{
                        ...cardLightStripeStyle,
                        ...(isHovered ? cardLightStripeHoveredStyle : {}),
                      }}
                    />

                    <Link
                      to={`/product/${id}`}
                      className="text-decoration-none"
                      style={{ color: "inherit" }}
                    >
                      <div style={imageWrapperStyle}>
                        <img
                          src={convertBase64ToDataURL(imageData)}
                          alt={name}
                          className="card-img-top"
                          style={imageStyle}
                          onError={(e) => {
                            e.target.src = unplugged;
                          }}
                        />
                      </div>

                      <div className="card-body" style={cardBodyStyle}>
                        <h5 style={productNameStyle}>{name.toUpperCase()}</h5>
                        <p style={brandStyle}>~ {brand}</p>
                        <hr style={dividerStyle} />
                        <div style={{ marginTop: "auto" }}>
                          <div style={priceRowStyle}>
                            <h5 style={priceStyle}>
                              <i
                                className="bi bi-currency-rupee"
                                style={rupeeIconStyle}
                              ></i>
                              {price}
                            </h5>
                            <span
                              style={stockBadgeStyle(outOfStock, isHovered)}
                            >
                              {outOfStock ? "Out of Stock" : "In Stock"}
                            </span>
                          </div>
                          <button
                            style={buttonStyle(outOfStock, isHovered)}
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={outOfStock}
                          >
                            {outOfStock ? "Out of Stock" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
