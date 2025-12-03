import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-toastify";

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    paddingTop: "96px",
    paddingBottom: "40px",
    background:
      "radial-gradient(circle at top, #020617 0, #020617 35%, #000000 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  innerContainer: {
    width: "100%",
    maxWidth: "960px",
    padding: "0 16px",
  },
  card: {
    borderRadius: "26px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(37,99,235,0.95))",
    boxShadow:
      "0 30px 70px rgba(15,23,42,1), 0 0 0 1px rgba(59,130,246,0.8)",
    border: "1px solid rgba(96,165,250,0.7)",
    overflow: "hidden",
    backdropFilter: "blur(18px)",
  },
  cardHeader: {
    padding: "18px 20px 10px",
    borderBottom: "1px solid rgba(30,64,175,0.7)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#e5e7eb",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "0.85rem",
    color: "#c7d2fe",
  },
  badge: {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    border: "1px solid rgba(56,189,248,0.9)",
    color: "#e0f2fe",
    background:
      "radial-gradient(circle at 0 0, rgba(56,189,248,0.6), rgba(15,23,42,0.98))",
    boxShadow: "0 0 18px rgba(56,189,248,0.7)",
  },
  cardBody: {
    padding: "18px 20px 22px",
    background:
      "radial-gradient(circle at top left, rgba(30,64,175,0.45), rgba(15,23,42,0.98))",
  },
  sectionLabel: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#9ca3af",
    marginBottom: "10px",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#e5e7eb",
  },
  input: {
    borderRadius: "999px",
    border: "1px solid rgba(55,65,81,0.9)",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "0.9rem",
    boxShadow: "0 0 0 0 rgba(59,130,246,0.6)",
    transition: "box-shadow 0.14s ease, border-color 0.14s ease",
  },
  textarea: {
    borderRadius: "16px",
    border: "1px solid rgba(55,65,81,0.9)",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "0.9rem",
    boxShadow: "0 0 0 0 rgba(59,130,246,0.6)",
    transition: "box-shadow 0.14s ease, border-color 0.14s ease",
  },
  inputGroupText: {
    borderRadius: "999px 0 0 999px",
    border: "1px solid rgba(55,65,81,0.9)",
    borderRight: "none",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#9ca3af",
    fontSize: "0.85rem",
  },
  select: {
    borderRadius: "999px",
    border: "1px solid rgba(55,65,81,0.9)",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "0.88rem",
    boxShadow: "0 0 0 0 rgba(59,130,246,0.6)",
    transition: "box-shadow 0.14s ease, border-color 0.14s ease",
  },
  helperText: {
    fontSize: "0.75rem",
    color: "#9ca3af",
  },
  imagePreview: {
    height: "170px",
    objectFit: "contain",
    borderRadius: "14px",
    backgroundColor: "#020617",
    boxShadow: "0 18px 40px rgba(15,23,42,1)",
  },
  availabilityCheck: {
    color: "#e5e7eb",
    fontSize: "0.88rem",
  },
  primaryButton: (loading) => ({
    borderRadius: "999px",
    padding: "9px 18px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    background: loading
      ? "linear-gradient(135deg, #4b5563, #374151)"
      : "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#e5e7eb",
    boxShadow: loading
      ? "0 0 0 rgba(0,0,0,0)"
      : "0 18px 36px rgba(37,99,235,1)",
    cursor: loading ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transform: loading ? "translateY(0)" : "translateY(-1px)",
    transition:
      "box-shadow 0.14s ease, transform 0.14s ease, background 0.14s ease",
  }),
  secondaryButton: {
    borderRadius: "999px",
    padding: "9px 16px",
    fontSize: "0.85rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "1px solid rgba(148,163,184,0.8)",
    backgroundColor: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
    boxShadow: "0 10px 24px rgba(15,23,42,0.9)",
    marginLeft: "8px",
  },
  loadingWrapper: {
    minHeight: "100vh",
    paddingTop: "96px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #020617 0, #020617 40%, #000000 100%)",
  },
  loadingCard: {
    width: "260px",
    height: "260px",
    borderRadius: "30px",
    background:
      "conic-gradient(from 0deg, #22c55e, #38bdf8, #6366f1, #22c55e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 26px 60px rgba(15,23,42,0.95)",
  },
  loadingInner: {
    width: "220px",
    height: "220px",
    borderRadius: "24px",
    background: "radial-gradient(circle at top, #020617 0, #020617 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#e5e7eb",
    fontSize: "13px",
    border: "1px solid rgba(148,163,184,0.4)",
  },
  loadingRing: {
    width: "68px",
    height: "68px",
    borderRadius: "999px",
    border: "3px solid rgba(59,130,246,0.3)",
    borderTopColor: "#38bdf8",
    marginBottom: "14px",
    animation: "spin 1s linear infinite", // requires global @keyframes spin (optional)
  },
  loadingTextMain: {
    fontWeight: 600,
    marginBottom: "4px",
  },
  loadingTextSub: {
    fontSize: "11px",
    color: "#9ca3af",
  },
};

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const converUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/product/${id}`);
        setProduct(response.data);
        setUpdateProduct(response.data);

        const responseImage = await axios.get(
          `${baseUrl}/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageFile = await converUrlToFile(
          responseImage.data,
          response.data.imageName
        );
        setImage(imageFile);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, baseUrl]);

  useEffect(() => {
    console.log("image Updated", image);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProductForm = new FormData();

    if (imageChanged && image) {
      updatedProductForm.append("imageFile", image);
    }

    updatedProductForm.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], {
        type: "application/json",
      })
    );

    try {
      const response = await axios.put(
        `${baseUrl}/api/product/${id}`,
        updatedProductForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product updated successfully:", response.data);
      toast.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageChanged(true);
    }
  };

  if (!product.id) {
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingInner}>
            <div style={styles.loadingRing} />
            <div style={styles.loadingTextMain}>Loading Product</div>
            <div style={styles.loadingTextSub}>
              Fetching product details from your API…
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.innerContainer}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleBlock}>
              <span style={styles.title}>Update Product</span>
              <span style={styles.subtitle}>
                Fine-tune details, adjust pricing, and refresh visuals.
              </span>
            </div>
            <div style={styles.badge}>ID #{product.id}</div>
          </div>

          <div style={styles.cardBody}>
            <div style={styles.sectionLabel}>Product Details</div>
            <form className="row g-3" noValidate onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label" style={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  style={styles.input}
                  value={updateProduct.name || ""}
                  onChange={handleChange}
                  name="name"
                  id="name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="brand" className="form-label" style={styles.label}>
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  style={styles.input}
                  value={updateProduct.brand || ""}
                  onChange={handleChange}
                  id="brand"
                  required
                />
              </div>

              <div className="col-12">
                <label
                  htmlFor="description"
                  className="form-label"
                  style={styles.label}
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  style={styles.textarea}
                  value={updateProduct.description || ""}
                  name="description"
                  onChange={handleChange}
                  id="description"
                  rows="3"
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="price" className="form-label" style={styles.label}>
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text" style={styles.inputGroupText}>
                    Rs
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    style={{
                      ...styles.input,
                      borderRadius: "0 999px 999px 0",
                    }}
                    onChange={handleChange}
                    value={updateProduct.price}
                    name="price"
                    id="price"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label
                  htmlFor="category"
                  className="form-label"
                  style={styles.label}
                >
                  Category
                </label>
                <select
                  className="form-select"
                  style={styles.select}
                  value={updateProduct.category || ""}
                  onChange={handleChange}
                  name="category"
                  id="category"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Toys">Toys</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div className="col-md-4">
                <label
                  htmlFor="stockQuantity"
                  className="form-label"
                  style={styles.label}
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  style={styles.input}
                  onChange={handleChange}
                  value={updateProduct.stockQuantity}
                  name="stockQuantity"
                  id="stockQuantity"
                  min="0"
                  required
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="releaseDate"
                  className="form-label"
                  style={styles.label}
                >
                  Release Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  style={styles.input}
                  value={
                    updateProduct.releaseDate
                      ? updateProduct.releaseDate.slice(0, 10)
                      : ""
                  }
                  name="releaseDate"
                  onChange={handleChange}
                  id="releaseDate"
                  required
                />
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="imageFile"
                  className="form-label"
                  style={styles.label}
                >
                  Image
                </label>
                {image && (
                  <div className="mb-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={product.name}
                      className="img-fluid rounded mb-2"
                      style={styles.imagePreview}
                    />
                  </div>
                )}
                <input
                  className="form-control"
                  type="file"
                  onChange={handleImageChange}
                  id="imageFile"
                  accept="image/png, image/jpeg"
                  style={{
                    borderRadius: "999px",
                    backgroundColor: "rgba(15,23,42,0.9)",
                    color: "#e5e7eb",
                  }}
                />
                <div className="form-text" style={styles.helperText}>
                  Leave empty to keep current image
                </div>
              </div>

              <div className="col-12 mt-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="productAvailable"
                    id="productAvailable"
                    checked={updateProduct.productAvailable || false}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="productAvailable"
                    style={styles.availabilityCheck}
                  >
                    Product Available
                  </label>
                </div>
              </div>

              <div className="col-12 mt-4">
                {loading ? (
                  <button
                    className="btn"
                    type="button"
                    disabled
                    style={styles.primaryButton(true)}
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    style={styles.primaryButton(false)}
                  >
                    Save Changes
                  </button>
                )}
                <button
                  type="button"
                  className="btn"
                  style={styles.secondaryButton}
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
