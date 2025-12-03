import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `${baseUrl}/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchProduct();
  }, [id, baseUrl]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`${baseUrl}/api/product/${id}`);
      removeFromCart(id);
      toast.success("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart");
  };

  // ---------- 3D / STYLING (INLINE) BUT CLEANER LAYOUT ----------

  const pageBackgroundStyle = {
    minHeight: "100vh",
    paddingTop: "110px",
    paddingBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #0f172a 0, #020617 45%, #000000 100%)",
  };

  const shellStyle = {
    width: "100%",
    maxWidth: "1120px",
    padding: "0 16px",
  };

  const cardWrapperStyle = {
    borderRadius: "24px",
    padding: "2px",
    background:
      "linear-gradient(135deg, rgba(96,165,250,1), rgba(236,72,153,1))",
    boxShadow: isHoveringCard
      ? "0 26px 70px rgba(15,23,42,1)"
      : "0 18px 50px rgba(15,23,42,0.9)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    transform: isHoveringCard ? "translateY(-6px)" : "translateY(0)",
  };

  const innerCardStyle = {
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,1), rgba(15,23,42,0.96))",
    padding: "24px 26px",
  };

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "24px",
  };

  const leftColStyle = {
    flex: "1 1 320px",
    display: "flex",
    justifyContent: "center",
  };

  const rightColStyle = {
    flex: "1 1 360px",
    color: "#e5e7eb",
  };

  const imageOuterStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "380px",
    borderRadius: "20px",
    padding: "16px",
    background:
      "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.25), transparent 55%)",
  };

  const imageFrameStyle = {
    borderRadius: "18px",
    padding: "14px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.95))",
    boxShadow:
      "0 18px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(55,65,81,0.8)",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "360px",
    objectFit: "contain",
    borderRadius: "12px",
    display: "block",
    margin: "0 auto",
    filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.85))",
    backgroundColor: "#020617",
  };

  const glowBaseStyle = {
    position: "absolute",
    left: "50%",
    bottom: "-10px",
    transform: "translateX(-50%)",
    width: "70%",
    height: "22px",
    background:
      "radial-gradient(circle at 50% 0%, rgba(148,163,184,0.9), transparent 70%)",
    filter: "blur(4px)",
    opacity: 0.9,
  };

  const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  };

  const categoryPillStyle = {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "5px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(96,165,250,0.9)",
    color: "#bfdbfe",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,64,175,0.9))",
  };

  const listedTextStyle = {
    fontSize: "0.8rem",
    color: "#9ca3af",
  };

  const nameStyle = {
    fontSize: "1.9rem",
    fontWeight: 700,
    letterSpacing: "0.02em",
    marginTop: "6px",
    marginBottom: "4px",
  };

  const brandStyle = {
    fontSize: "0.95rem",
    fontStyle: "italic",
    color: "#9ca3af",
    marginBottom: "14px",
  };

  const tagRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px",
  };

  const miniTagStyle = {
    fontSize: "0.7rem",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.8)",
    color: "#cbd5f5",
    background:
      "linear-gradient(135deg, rgba(31,41,55,0.95), rgba(15,23,42,0.98))",
  };

  const dividerStyle = {
    height: "1px",
    width: "100%",
    background:
      "linear-gradient(to right, transparent, rgba(55,65,81,0.95), transparent)",
    margin: "12px 0 16px",
  };

  const sectionTitleStyle = {
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "#9ca3af",
    marginBottom: "4px",
  };

  const descriptionStyle = {
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#d1d5db",
    marginBottom: "14px",
  };

  const priceRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "16px",
  };

  const priceStyle = {
    fontSize: "1.9rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "baseline",
    gap: "4px",
    color: "#e5e7eb",
  };

  const rupeeIconStyle = {
    fontSize: "1.4rem",
  };

  const perUnitStyle = {
    fontSize: "0.8rem",
    color: "#9ca3af",
    marginLeft: "2px",
  };

  const stockBlockStyle = {
    textAlign: "right",
    minWidth: "140px",
  };

  const stockLabelStyle = {
    fontSize: "0.82rem",
    color: "#9ca3af",
    marginBottom: "2px",
  };

  const stockValueRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "6px",
  };

  const stockNumberStyle = (outOfStock) => ({
    fontWeight: 700,
    fontSize: "0.95rem",
    color: outOfStock ? "#fecaca" : "#bbf7d0",
  });

  const stockBadgeStyle = (outOfStock) => ({
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "4px 10px",
    borderRadius: "999px",
    border: outOfStock
      ? "1px solid rgba(248,113,113,0.9)"
      : "1px solid rgba(34,197,94,0.9)",
    color: outOfStock ? "#fecaca" : "#bbf7d0",
    background: outOfStock
      ? "linear-gradient(135deg, rgba(127,29,29,0.95), rgba(30,64,75,0.96))"
      : "linear-gradient(135deg, rgba(34,197,94,0.9), rgba(21,128,61,0.96))",
  });

  const primaryButtonStyle = (disabled) => ({
    borderRadius: "999px",
    padding: "11px 0",
    width: "100%",
    border: "none",
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    background: disabled
      ? "linear-gradient(135deg, #4b5563, #374151)"
      : "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: disabled ? "#9ca3af" : "#f9fafb",
    boxShadow: disabled
      ? "0 0 0 rgba(0,0,0,0)"
      : "0 18px 35px rgba(79,70,229,0.9)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  });

  const actionsRowStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
    flexWrap: "wrap",
  };

  const secondaryButtonStyle = (type) => ({
    flex: "1 1 140px",
    borderRadius: "999px",
    padding: "9px 0",
    fontSize: "0.8rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    background: "transparent",
    border:
      type === "edit"
        ? "1px solid rgba(96,165,250,0.9)"
        : "1px solid rgba(248,113,113,0.9)",
    color: type === "edit" ? "#bfdbfe" : "#fecaca",
    boxShadow:
      type === "edit"
        ? "0 0 0 1px rgba(37,99,235,0.4)"
        : "0 0 0 1px rgba(248,113,113,0.4)",
    cursor: "pointer",
  });

  const loadingWrapperStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
  };

  if (!product) {
    return (
      <div style={loadingWrapperStyle}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const outOfStock =
    !product.productAvailable || product.stockQuantity === 0;

  return (
    <div style={pageBackgroundStyle}>
      <div style={shellStyle}>
        <div
          style={cardWrapperStyle}
          onMouseEnter={() => setIsHoveringCard(true)}
          onMouseLeave={() => setIsHoveringCard(false)}
        >
          <div style={innerCardStyle}>
            <div style={rowStyle}>
              {/* LEFT: Image column */}
              <div style={leftColStyle}>
                <div style={imageOuterStyle}>
                  <div style={imageFrameStyle}>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      style={imageStyle}
                      onError={(e) => {
                        e.target.style.opacity = 0.3;
                      }}
                    />
                  </div>
                  <div style={glowBaseStyle}></div>
                </div>
              </div>

              {/* RIGHT: Details column */}
              <div style={rightColStyle}>
                <div style={headerRowStyle}>
                  <span style={categoryPillStyle}>{product.category}</span>
                  <small style={listedTextStyle}>
                    Listed:{" "}
                    {product.releaseDate
                      ? new Date(product.releaseDate).toLocaleDateString()
                      : "N/A"}
                  </small>
                </div>

                <h2 style={nameStyle} className="text-capitalize">
                  {product.name}
                </h2>
                <p style={brandStyle}>~ {product.brand}</p>

                <div style={tagRowStyle}>
                  <span style={miniTagStyle}>Premium pick</span>
                  <span style={miniTagStyle}>
                    {product.productAvailable ? "Live" : "Unavailable"}
                  </span>
                  <span style={miniTagStyle}>ID #{product.id}</span>
                </div>

                <div style={dividerStyle}></div>

                <div>
                  <div style={sectionTitleStyle}>Description</div>
                  <p style={descriptionStyle}>{product.description}</p>
                </div>

                <div style={dividerStyle}></div>

                <div style={priceRowStyle}>
                  <div>
                    <div style={sectionTitleStyle}>Price</div>
                    <div style={priceStyle}>
                      <i
                        className="bi bi-currency-rupee"
                        style={rupeeIconStyle}
                      ></i>
                      {product.price}
                      <span style={perUnitStyle}>/ unit</span>
                    </div>
                  </div>

                  <div style={stockBlockStyle}>
                    <div style={stockLabelStyle}>Stock</div>
                    <div style={stockValueRowStyle}>
                      <span style={stockNumberStyle(outOfStock)}>
                        {product.stockQuantity}
                      </span>
                      <span style={stockBadgeStyle(outOfStock)}>
                        {outOfStock ? "Out of Stock" : "Available"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  style={primaryButtonStyle(outOfStock)}
                  disabled={outOfStock}
                  onClick={handlAddToCart}
                >
                  {outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>

                <div style={actionsRowStyle}>
                  <button
                    type="button"
                    style={secondaryButtonStyle("edit")}
                    onClick={handleEditClick}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Update
                  </button>

                  <button
                    type="button"
                    style={secondaryButtonStyle("delete")}
                    onClick={deleteProduct}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
