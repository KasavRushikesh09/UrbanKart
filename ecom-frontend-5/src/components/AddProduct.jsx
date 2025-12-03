import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ================= 3D / AESTHETIC INLINE STYLES =================
  const pageWrapperStyle = {
    minHeight: "100vh",
    paddingTop: "96px",
    paddingBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background:
      "radial-gradient(circle at top left, #0f172a 0, #020617 40%, #000000 100%)",
  };

  const cardStyle = {
    maxWidth: "880px",
    width: "100%",
    margin: "0 auto",
    borderRadius: "26px",
    padding: "26px 30px 28px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.92))",
    boxShadow:
      "0 28px 70px rgba(15,23,42,0.9), 0 0 0 1px rgba(148,163,184,0.28)",
    border: "1px solid rgba(30,64,175,0.6)",
    backdropFilter: "blur(20px)",
  };

  const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#e5e7eb",
  };

  const subtitleStyle = {
    margin: 0,
    fontSize: "0.9rem",
    color: "#9ca3af",
  };

  const badgeStyle = {
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "1px solid rgba(59,130,246,0.8)",
    color: "#bfdbfe",
    background:
      "radial-gradient(circle at 15% 0, rgba(59,130,246,0.25), rgba(15,23,42,1))",
    boxShadow: "0 12px 26px rgba(37,99,235,0.75)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const formLabelStyle = {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    fontWeight: 500,
    marginBottom: "6px",
  };

  const inputStyle = {
    backgroundColor: "#020617",
    borderRadius: "12px",
    border: "1px solid rgba(55,65,81,0.9)",
    color: "#e5e7eb",
    fontSize: "0.9rem",
    padding: "10px 12px",
    boxShadow: "0 10px 22px rgba(15,23,42,0.9)",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "90px",
    resize: "vertical",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #9ca3af 50%), linear-gradient(135deg, #9ca3af 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 18px) 16px, calc(100% - 13px) 16px",
    backgroundSize: "6px 6px, 6px 6px",
    backgroundRepeat: "no-repeat",
  };

  const checkboxLabelStyle = {
    color: "#e5e7eb",
    marginLeft: "8px",
    fontSize: "0.9rem",
  };

  const errorTextStyle = {
    color: "#f97373",
    fontSize: "0.8rem",
    marginTop: "4px",
  };

  const imagePreviewWrapperStyle = {
    marginTop: "12px",
    borderRadius: "18px",
    padding: "10px",
    background:
      "radial-gradient(circle at 0 0, rgba(59,130,246,0.25), rgba(15,23,42,1))",
    border: "1px solid rgba(30,64,175,0.8)",
    display: "inline-block",
    boxShadow: "0 18px 36px rgba(15,23,42,0.95)",
  };

  const imagePreviewStyle = {
    maxWidth: "160px",
    maxHeight: "160px",
    borderRadius: "14px",
    objectFit: "cover",
    display: "block",
  };

  const submitButtonStyle = {
    marginTop: "6px",
    minWidth: "180px",
    borderRadius: "999px",
    padding: "11px 26px",
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "none",
    color: "#e5e7eb",
    background:
      "linear-gradient(135deg, #22c55e 0%, #16a34a 40%, #22c55e 100%)",
    boxShadow:
      "0 20px 40px rgba(22,163,74,0.95), 0 0 0 1px rgba(22,163,74,0.9)",
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  };

  const submitButtonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow:
      "0 24px 50px rgba(22,163,74,1), 0 0 0 1px rgba(22,163,74,0.95)",
  };

  const [isButtonHover, setIsButtonHover] = useState(false);

  // ================= HANDLERS =================

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setProduct({ ...product, [name]: fieldValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          image: "Please select a valid image file (JPEG or PNG)",
        });
      } else if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size should be less than 5MB" });
      } else {
        setErrors({ ...errors, image: null });
      }
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required";
    if (!product.brand.trim()) newErrors.brand = "Brand is required";
    if (!product.description.trim())
      newErrors.description = "Description is required";
    if (!product.price || parseFloat(product.price) <= 0)
      newErrors.price = "Price must be greater than zero";
    if (!product.category) newErrors.category = "Please select a category";
    if (!product.stockQuantity || parseInt(product.stockQuantity) < 0)
      newErrors.stockQuantity = "Stock quantity cannot be negative";
    if (!product.releaseDate)
      newErrors.releaseDate = "Release date is required";
    if (!image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (!validateForm() || !form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post(`${baseUrl}/api/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.success("Product added successfully");
        setProduct({
          name: "",
          brand: "",
          description: "",
          price: "",
          category: "",
          stockQuantity: "",
          releaseDate: "",
          productAvailable: false,
        });
        setImage(null);
        setImagePreview(null);
        setValidated(false);
        setErrors({});
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          toast.error("Error adding product");
        }
        setLoading(false);
      });
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={cardStyle}>
        <div style={headerRowStyle}>
          <div>
            <h2 style={titleStyle}>Add New Product</h2>
            <p style={subtitleStyle}>
              Craft a new item to showcase in your Urbankart store.
            </p>
          </div>
          <div style={badgeStyle}>
            <i className="bi bi-box-seam"></i>
            Live inventory
          </div>
        </div>

        <form noValidate onSubmit={submitHandler} className="row g-4">
          <div className="col-md-6">
            <label style={formLabelStyle}>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              style={inputStyle}
              value={product.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <div style={errorTextStyle}>{errors.name}</div>
            )}
          </div>

          <div className="col-md-6">
            <label style={formLabelStyle}>Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              style={inputStyle}
              value={product.brand}
              onChange={handleInputChange}
            />
            {errors.brand && (
              <div style={errorTextStyle}>{errors.brand}</div>
            )}
          </div>

          <div className="col-md-12">
            <label style={formLabelStyle}>Description</label>
            <textarea
              name="description"
              className="form-control"
              style={textareaStyle}
              value={product.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <div style={errorTextStyle}>{errors.description}</div>
            )}
          </div>

          <div className="col-md-4">
            <label style={formLabelStyle}>Price (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              style={inputStyle}
              value={product.price}
              onChange={handleInputChange}
            />
            {errors.price && (
              <div style={errorTextStyle}>{errors.price}</div>
            )}
          </div>

          <div className="col-md-4">
            <label style={formLabelStyle}>Category</label>
            <select
              className="form-select"
              style={selectStyle}
              value={product.category}
              onChange={handleInputChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
            {errors.category && (
              <div style={errorTextStyle}>{errors.category}</div>
            )}
          </div>

          <div className="col-md-4">
            <label style={formLabelStyle}>Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              className="form-control"
              style={inputStyle}
              value={product.stockQuantity}
              onChange={handleInputChange}
            />
            {errors.stockQuantity && (
              <div style={errorTextStyle}>{errors.stockQuantity}</div>
            )}
          </div>

          <div className="col-md-6">
            <label style={formLabelStyle}>Release Date</label>
            <input
              type="date"
              name="releaseDate"
              className="form-control"
              style={inputStyle}
              value={product.releaseDate}
              onChange={handleInputChange}
            />
            {errors.releaseDate && (
              <div style={errorTextStyle}>{errors.releaseDate}</div>
            )}
          </div>

          <div
            className="col-md-6 d-flex align-items-center"
            style={{ marginTop: "10px" }}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                checked={product.productAvailable}
                onChange={handleInputChange}
                id="productAvailable"
              />
              <label
                className="form-check-label"
                htmlFor="productAvailable"
                style={checkboxLabelStyle}
              >
                Product Available
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <label style={formLabelStyle}>Image</label>
            <input
              type="file"
              className="form-control"
              style={inputStyle}
              onChange={handleImageChange}
            />
            {errors.image && (
              <div style={errorTextStyle}>{errors.image}</div>
            )}
            {imagePreview && (
              <div style={imagePreviewWrapperStyle}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={imagePreviewStyle}
                />
              </div>
            )}
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                ...submitButtonStyle,
                ...(isButtonHover ? submitButtonHoverStyle : {}),
              }}
              onMouseEnter={() => setIsButtonHover(true)}
              onMouseLeave={() => setIsButtonHover(false)}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
