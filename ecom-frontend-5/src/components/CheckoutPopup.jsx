import axios from "axios";
import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import unplugged from "../assets/unplugged.png";

const styles = {
  modal: {
    // this affects the outer wrapper that Modal applies styles to
  },
  modalHeader: {
    borderBottom: "none",
    padding: "16px 18px 8px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(37,99,235,0.92))",
    color: "#e5e7eb",
  },
  modalTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  modalBody: {
    padding: "16px 18px 18px",
    background:
      "radial-gradient(circle at top left, rgba(30,64,175,0.6), rgba(15,23,42,1))",
    borderTop: "1px solid rgba(37,99,235,0.7)",
    borderBottom: "1px solid rgba(37,99,235,0.7)",
  },
  modalFooter: {
    padding: "12px 18px 16px",
    background: "rgba(15,23,42,0.98)",
    borderTop: "1px solid rgba(31,41,55,0.85)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerHint: {
    fontSize: "0.75rem",
    color: "#9ca3af",
  },
  itemRow: {
    display: "flex",
    marginBottom: "10px",
    padding: "8px 10px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.9))",
    boxShadow: "0 14px 30px rgba(15,23,42,0.9)",
    border: "1px solid rgba(37,99,235,0.7)",
  },
  itemImage: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 12px 28px rgba(15,23,42,1)",
  },
  itemName: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#e5e7eb",
  },
  itemMeta: {
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
  itemPrice: {
    fontSize: "0.8rem",
    color: "#c4b5fd",
    marginTop: "2px",
  },
  totalWrapper: {
    textAlign: "center",
    margin: "14px 0 18px",
  },
  totalCard: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(56,189,248,0.8)",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.4), rgba(15,23,42,0.98))",
    boxShadow: "0 0 20px rgba(56,189,248,0.8)",
    color: "#e5e7eb",
    fontSize: "0.95rem",
  },
  totalLabel: {
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.7rem",
    color: "#bfdbfe",
    marginRight: "6px",
  },
  totalAmount: {
    fontWeight: 700,
  },
  formLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#e5e7eb",
  },
  formControl: {
    borderRadius: "999px",
    border: "1px solid rgba(55,65,81,0.9)",
    backgroundColor: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
    fontSize: "0.9rem",
    boxShadow: "0 0 0 0 rgba(59,130,246,0.6)",
    transition: "box-shadow 0.14s ease, border-color 0.14s ease",
  },
  primaryButton: (isSubmitting) => ({
    borderRadius: "999px",
    padding: "8px 16px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    background: isSubmitting
      ? "linear-gradient(135deg, #4b5563, #374151)"
      : "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#e5e7eb",
    boxShadow: isSubmitting
      ? "0 0 0 rgba(0,0,0,0)"
      : "0 16px 32px rgba(37,99,235,1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transform: isSubmitting ? "translateY(0)" : "translateY(-1px)",
    transition:
      "box-shadow 0.14s ease, transform 0.14s ease, background 0.14s ease",
  }),
  secondaryButton: {
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "0.8rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "1px solid rgba(148,163,184,0.9)",
    backgroundColor: "rgba(15,23,42,1)",
    color: "#e5e7eb",
    boxShadow: "0 12px 26px rgba(15,23,42,0.95)",
  },
  toastContainer: {
    zIndex: 1070,
  },
  toast: {
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow:
      "0 20px 50px rgba(15,23,42,0.95), 0 0 0 1px rgba(148,163,184,0.5)",
  },
  toastHeader: {
    padding: "8px 10px",
    borderBottom: "1px solid rgba(148,163,184,0.6)",
  },
};

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleConfirm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);

    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const data = {
      customerName: name,
      email: email,
      items: orderItems,
    };

    try {
      const response = await axios.post(`${baseUrl}/api/orders/place`, data);
      console.log(response, "order placed");

      setToastVariant("success");
      setToastMessage("Order placed successfully!");
      setShowToast(true);

      localStorage.removeItem("cart");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setToastVariant("danger");
      setToastMessage("Failed to place order. Please try again.");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        contentClassName="border-0"
        style={styles.modal}
      >
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>Checkout</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleConfirm}>
          <Modal.Body style={styles.modalBody}>
            <div className="checkout-items mb-3">
              {cartItems.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <img
                    src={convertBase64ToDataURL(item.imageData)}
                    alt={item.name}
                    className="me-3"
                    style={styles.itemImage}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1" style={styles.itemName}>
                      {item.name}
                    </h6>
                    <p className="mb-1" style={styles.itemMeta}>
                      Quantity: {item.quantity}
                    </p>
                    <p className="mb-0" style={styles.itemPrice}>
                      Price: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div style={styles.totalWrapper}>
                <div style={styles.totalCard}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalAmount}>
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label style={styles.formLabel}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  style={styles.formControl}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label style={styles.formLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  style={styles.formControl}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Modal.Body>

          <Modal.Footer style={styles.modalFooter}>
            <span style={styles.footerHint}>
              You’ll receive your order details on the email provided.
            </span>
            <div>
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={isSubmitting}
                style={styles.secondaryButton}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                style={styles.primaryButton(isSubmitting)}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  "Confirm Purchase"
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Toast notification */}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={styles.toastContainer}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastVariant}
          style={styles.toast}
        >
          <Toast.Header closeButton style={styles.toastHeader}>
            <strong className="me-auto">Order Status</strong>
          </Toast.Header>
          <Toast.Body
            className={toastVariant === "success" ? "text-white" : ""}
          >
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default CheckoutPopup;
