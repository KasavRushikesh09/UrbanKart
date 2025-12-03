import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartImage, setCartImage] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // ===== 3D / AESTHETIC INLINE STYLES =====
  const pageWrapperStyle = {
    minHeight: "100vh",
    paddingTop: "90px",
    paddingBottom: "40px",
    background:
      "radial-gradient(circle at top left, #eff6ff 0, #e5e7eb 30%, #020617 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  };

  const outerCardStyle = {
    borderRadius: "24px",
    border: "1px solid rgba(148,163,184,0.35)",
    boxShadow:
      "0 26px 60px rgba(15,23,42,0.45), 0 0 0 1px rgba(15,23,42,0.06)",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))",
    overflow: "hidden",
  };

  const headerStyle = {
    background:
      "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(129,140,248,0.16))",
    borderBottom: "1px solid rgba(148,163,184,0.5)",
    padding: "18px 24px",
  };

  const headerTitleStyle = {
    margin: 0,
    color: "#e5e7eb",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontSize: "0.85rem",
  };

  const headerSubStyle = {
    margin: 0,
    color: "#9ca3af",
    fontSize: "0.8rem",
  };

  const tableWrapperStyle = {
    borderRadius: "18px",
    background:
      "radial-gradient(circle at top, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
    border: "1px solid rgba(31,41,55,0.9)",
  };

  const tableHeaderStyle = {
    background:
      "linear-gradient(120deg, rgba(15,23,42,0.9), rgba(31,41,55,0.95))",
    color: "#9ca3af",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };

  const tableRowStyle = {
    borderBottom: "1px solid rgba(31,41,55,0.9)",
  };

  const productCellStyle = {
    color: "#e5e7eb",
  };

  const brandTextStyle = {
    fontSize: "0.8rem",
    color: "#9ca3af",
  };

  const priceTextStyle = {
    color: "#e5e7eb",
    fontWeight: 500,
  };

  const totalCellStyle = {
    color: "#fbbf24",
    fontWeight: 600,
    fontSize: "0.95rem",
  };

  const qtyGroupStyle = {
    width: "130px",
    borderRadius: "999px",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(15,23,42,0.65)",
  };

  const qtyButtonStyle = {
    border: "none",
    background:
      "radial-gradient(circle at 30% 20%, #111827, #020617 70%, #0f172a 100%)",
    color: "#e5e7eb",
  };

  const qtyInputStyle = {
    backgroundColor: "#020617",
    border: "none",
    color: "#e5e7eb",
  };

  const deleteButtonStyle = {
    borderRadius: "999px",
    padding: "6px 10px",
    border: "1px solid rgba(239,68,68,0.7)",
    background:
      "radial-gradient(circle at 30% 20%, rgba(248,113,113,0.12), rgba(127,29,29,0.4))",
    color: "#fecaca",
    boxShadow: "0 6px 14px rgba(127,29,29,0.7)",
  };

  const summaryCardStyle = {
    borderRadius: "18px",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.15), rgba(15,23,42,0.98))",
    border: "1px solid rgba(59,130,246,0.5)",
    boxShadow:
      "0 18px 40px rgba(37,99,235,0.65), 0 0 0 1px rgba(15,23,42,0.6)",
  };

  const summaryLabelStyle = {
    color: "#9ca3af",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  };

  const summaryValueStyle = {
    color: "#e5e7eb",
    fontSize: "1.35rem",
    fontWeight: 700,
    textShadow: "0 3px 12px rgba(15,23,42,0.9)",
  };

  const checkoutButtonStyle = {
    borderRadius: "999px",
    padding: "12px 0",
    fontSize: "1rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    background:
      "linear-gradient(135deg, #22c55e 0%, #16a34a 35%, #22c55e 100%)",
    boxShadow:
      "0 18px 32px rgba(22,163,74,0.9), 0 0 0 1px rgba(22,163,74,0.9)",
    border: "none",
  };

  const emptyStateWrapperStyle = {
    padding: "72px 0",
    textAlign: "center",
    color: "#e5e7eb",
  };

  const emptyIconWrapperStyle = {
    width: 94,
    height: 94,
    borderRadius: "50%",
    margin: "0 auto",
    marginBottom: "18px",
    background:
      "radial-gradient(circle at 30% 20%, rgba(251,191,36,0.35), rgba(15,23,42,1))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 18px 38px rgba(15,23,42,0.9)",
  };

  const emptyIconStyle = {
    fontSize: "2.4rem",
    color: "#fcd34d",
  };

  const emptyTitleStyle = {
    marginTop: "0.75rem",
    marginBottom: "0.25rem",
    fontSize: "1.25rem",
    fontWeight: 600,
  };

  const emptyTextStyle = {
    margin: 0,
    color: "#9ca3af",
    fontSize: "0.9rem",
  };

  const emptyButtonStyle = {
    marginTop: "1.5rem",
    borderRadius: "999px",
    padding: "10px 26px",
    fontWeight: 600,
    border: "none",
    background:
      "linear-gradient(135deg, #3b82f6 0%, #2563eb 40%, #4f46e5 100%)",
    color: "#e5e7eb",
    boxShadow:
      "0 16px 32px rgba(37,99,235,0.9), 0 0 0 1px rgba(37,99,235,0.85)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontSize: "0.85rem",
  };

  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      console.log("Cart", cart);
      try {
        // ✅ backend is /api/product (not /api/products)
        const response = await axios.get(`${baseUrl}/api/product`);
        console.log("cart", cart);
        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (cart.length) {
      fetchImagesAndUpdateCart();
    } else {
      setCartItems([]);
    }
  }, [cart, baseUrl]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const converUrlToFile = async (blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  };

  const handleIncreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < item.stockQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          toast.info("Cannot add more than available stock");
        }
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const newCartItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartItems);
  };

  const convertBase64ToDataURL = (base64String, mimeType = "image/jpeg") => {
    const fallbackImage = "/fallback-image.jpg"; // make sure this exists in public/

    if (!base64String) return fallbackImage;

    if (base64String.startsWith("data:")) {
      return base64String;
    }
    if (base64String.startsWith("http")) {
      return base64String;
    }
    return `data:${mimeType};base64,${base64String}`;
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, imageName, imageData, imageType, quantity, ...rest } =
          item;
        const updatedStockQuantity = item.stockQuantity - item.quantity;

        const updatedProductData = {
          ...rest,
          stockQuantity: updatedStockQuantity,
        };
        console.log("updated product data", updatedProductData);

        const cartProduct = new FormData();
        cartProduct.append("imageFile", cartImage);
        cartProduct.append(
          "product",
          new Blob([JSON.stringify(updatedProductData)], {
            type: "application/json",
          })
        );

        await axios
          .put(`${baseUrl}/api/product/${item.id}`, cartProduct, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("Product updated successfully:", cartProduct);
          })
          .catch((error) => {
            console.error("Error updating product:", error);
          });
      }
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.log("error during checkout", error);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9">
            <div className="card" style={outerCardStyle}>
              <div style={headerStyle}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p style={headerTitleStyle}>Shopping Cart</p>
                    <p style={headerSubStyle}>
                      {cartItems.length > 0
                        ? `${cartItems.length} item${
                            cartItems.length > 1 ? "s" : ""
                          } in your bag`
                        : "Carefully crafted cart experience"}
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      border: "1px solid rgba(148,163,184,0.6)",
                      color: "#9ca3af",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    <i className="bi bi-shield-check me-1"></i>
                    Secure checkout
                  </div>
                </div>
              </div>

              <div className="card-body" style={{ padding: "24px" }}>
                {cartItems.length === 0 ? (
                  <div style={emptyStateWrapperStyle}>
                    <div style={emptyIconWrapperStyle}>
                      <i
                        className="bi bi-bag-heart-fill"
                        style={emptyIconStyle}
                      ></i>
                    </div>
                    <h5 style={emptyTitleStyle}>Your cart is feeling lonely</h5>
                    <p style={emptyTextStyle}>
                      Discover something you love and bring this space to life.
                    </p>
                    <a href="/" style={emptyButtonStyle}>
                      Start shopping
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive" style={tableWrapperStyle}>
                      <table className="table table-borderless align-middle mb-0">
                        <thead>
                          <tr style={tableHeaderStyle}>
                            <th style={{ border: "none" }}>Product</th>
                            <th style={{ border: "none" }}>Price</th>
                            <th style={{ border: "none" }}>Quantity</th>
                            <th style={{ border: "none" }}>Total</th>
                            <th style={{ border: "none" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id} style={tableRowStyle}>
                              <td style={productCellStyle}>
                                <div className="d-flex align-items-center">
                                  <div
                                    style={{
                                      width: 74,
                                      height: 74,
                                      borderRadius: "20px",
                                      overflow: "hidden",
                                      background:
                                        "radial-gradient(circle at 30% 20%, #111827, #020617)",
                                      boxShadow:
                                        "0 10px 20px rgba(0,0,0,0.75)",
                                      marginRight: "14px",
                                    }}
                                  >
                                    <img
                                      src={convertBase64ToDataURL(
                                        item.imageData
                                      )}
                                      alt={item.name}
                                      width="74"
                                      height="74"
                                      style={{
                                        objectFit: "cover",
                                        display: "block",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <h6
                                      className="mb-1"
                                      style={{ color: "#e5e7eb" }}
                                    >
                                      {item.name}
                                    </h6>
                                    <div style={brandTextStyle}>
                                      {item.brand} •{" "}
                                      <span style={{ color: "#22c55e" }}>
                                        In stock: {item.stockQuantity}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td style={priceTextStyle}>₹ {item.price}</td>
                              <td>
                                <div
                                  className="input-group input-group-sm"
                                  style={qtyGroupStyle}
                                >
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleDecreaseQuantity(item.id)
                                    }
                                    style={qtyButtonStyle}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    value={item.quantity}
                                    readOnly
                                    style={qtyInputStyle}
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleIncreaseQuantity(item.id)
                                    }
                                    style={qtyButtonStyle}
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td style={totalCellStyle}>
                                ₹ {(item.price * item.quantity).toFixed(2)}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm"
                                  onClick={() =>
                                    handleRemoveFromCart(item.id)
                                  }
                                  style={deleteButtonStyle}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="card mt-4" style={summaryCardStyle}>
                      <div
                        className="card-body d-flex justify-content-between align-items-center"
                        style={{ padding: "16px 20px" }}
                      >
                        <div>
                          <div style={summaryLabelStyle}>Order Total</div>
                          <div style={summaryValueStyle}>
                            ₹ {totalPrice.toFixed(2)}
                          </div>
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            fontSize: "0.8rem",
                            color: "#cbd5f5",
                          }}
                        >
                          <div>
                            <i className="bi bi-truck me-1"></i> Free delivery
                            on this order
                          </div>
                          <div>
                            <i className="bi bi-gift me-1"></i> Eligible for
                            gift options
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid mt-4">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setShowModal(true)}
                        style={checkoutButtonStyle}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
