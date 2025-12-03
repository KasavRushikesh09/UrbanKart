import axios from "axios";
import React, { useEffect, useState } from "react";

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    paddingTop: "80px",
    paddingBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background:
      "radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%)",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  pageInner: {
    width: "100%",
    maxWidth: "1150px",
    padding: "0 16px",
  },
  pageTitle: {
    color: "#e5e7eb",
    textAlign: "center",
    marginBottom: "18px",
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textShadow: "0 10px 30px rgba(0,0,0,0.6)",
  },
  subtitle: {
    textAlign: "center",
    color: "#9ca3af",
    marginBottom: "26px",
    fontSize: "14px",
  },
  card: {
    width: "100%",
    borderRadius: "24px",
    padding: "20px 22px 18px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,64,175,0.9))",
    boxShadow:
      "0 28px 60px rgba(15, 23, 42, 0.95), 0 0 0 1px rgba(148,163,184,0.45)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(148,163,184,0.3)",
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  glowingDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, #22c55e 0, #22c55e 45%, transparent 70%)",
    boxShadow: "0 0 14px rgba(34,197,94,0.8)",
  },
  cardTitleText: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#e5e7eb",
  },
  pillCount: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    color: "#e5e7eb",
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(129,140,248,0.2))",
    border: "1px solid rgba(129,140,248,0.8)",
  },
  filterChipRow: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    fontSize: "11px",
    color: "#94a3b8",
  },
  filterChip: {
    padding: "4px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.6)",
    background: "rgba(15,23,42,0.8)",
  },
  tableWrapper: {
    borderRadius: "18px",
    overflow: "hidden",
    marginTop: "10px",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 18px 40px rgba(15,23,42,0.8)",
  },
  table: {
    marginBottom: 0,
    background: "rgba(15,23,42,0.9)",
  },
  thead: {
    background:
      "linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.9))",
  },
  th: {
    borderBottom: "none",
    fontSize: "12px",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "12px 14px",
    whiteSpace: "nowrap",
  },
  baseRow: {
    borderBottom: "1px solid rgba(30,64,175,0.45)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s",
    background:
      "linear-gradient(90deg, rgba(15,23,42,0.94), rgba(15,23,42,0.88))",
  },
  rowHovered: {
    transform: "translateY(-3px) translateZ(0)",
    boxShadow: "0 14px 32px rgba(15,23,42,0.9)",
    background:
      "linear-gradient(90deg, rgba(15,23,42,1), rgba(30,64,175,0.35))",
  },
  rowExpanded: {
    boxShadow: "0 16px 40px rgba(30,64,175,0.95)",
  },
  td: {
    borderBottom: "none",
    padding: "14px 14px",
    fontSize: "14px",
    color: "#e5e7eb",
    verticalAlign: "middle",
  },
  orderIdText: {
    fontWeight: 600,
    fontSize: "14px",
  },
  customerName: {
    fontWeight: 500,
    fontSize: "14px",
  },
  customerEmail: {
    fontSize: "11px",
    color: "#9ca3af",
  },
  dateText: {
    fontSize: "13px",
    color: "#d1d5db",
  },
  badgeBase: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: "999px",
    padding: "4px 10px",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    border: "1px solid transparent",
  },
  chipDot: (color) => ({
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    backgroundColor: color,
    boxShadow: `0 0 8px ${color}`,
  }),
  qtyCell: {
    textAlign: "center",
  },
  totalCell: {
    fontWeight: 700,
    textAlign: "right",
    fontSize: "14px",
  },
  actionButton: (isActive) => ({
    border: "none",
    outline: "none",
    cursor: "pointer",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#e5e7eb",
    background: isActive
      ? "linear-gradient(135deg, #38bdf8, #6366f1)"
      : "linear-gradient(135deg, rgba(59,130,246,0.85), rgba(129,140,248,0.8))",
    boxShadow: isActive
      ? "0 10px 22px rgba(59,130,246,0.8)"
      : "0 8px 18px rgba(30,64,175,0.7)",
    transform: isActive ? "translateY(-1px)" : "translateY(0)",
    transition:
      "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
    borderImage:
      "linear-gradient(135deg, rgba(191,219,254,0.8), rgba(192,132,252,0.8)) 1",
    borderWidth: "1px",
    borderStyle: "solid",
  }),
  detailsRow: {
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,64,175,0.9))",
  },
  detailsContainer: {
    padding: "16px 18px 16px",
    borderTop: "1px solid rgba(37,99,235,0.35)",
  },
  detailsTitle: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#9ca3af",
    marginBottom: "10px",
  },
  detailsTable: {
    marginBottom: 0,
    fontSize: "13px",
  },
  detailsTh: {
    borderBottom: "none",
    fontSize: "11px",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    background: "rgba(15,23,42,0.95)",
  },
  detailsTd: {
    borderBottom: "1px solid rgba(30,64,175,0.5)",
    padding: "8px 10px",
    color: "#e5e7eb",
  },
  detailsTotalRow: {
    background:
      "linear-gradient(90deg, rgba(30,64,175,0.65), rgba(56,189,248,0.15))",
  },
  detailsTotalLabel: {
    textAlign: "right",
    fontWeight: 600,
    color: "#e5e7eb",
  },
  detailsTotalValue: {
    textAlign: "right",
    fontWeight: 700,
    fontSize: "14px",
  },
  loadingWrapper: {
    minHeight: "100vh",
    paddingTop: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%)",
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
    animation: "spin 1s linear infinite",
  },
  loadingTextMain: {
    fontWeight: 600,
    marginBottom: "4px",
  },
  loadingTextSub: {
    fontSize: "11px",
    color: "#9ca3af",
  },
  errorWrapper: {
    minHeight: "100vh",
    paddingTop: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #1f2937 0, #020617 45%, #000 100%)",
  },
  errorCard: {
    maxWidth: "420px",
    width: "100%",
    padding: "20px 22px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(127,29,29,0.95), rgba(248,113,113,0.1))",
    border: "1px solid rgba(239,68,68,0.6)",
    color: "#fee2e2",
    boxShadow: "0 26px 60px rgba(127,29,29,0.95)",
  },
  errorTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "6px",
  },
  errorMsg: {
    fontSize: "13px",
    marginBottom: "10px",
  },
  errorHint: {
    fontSize: "11px",
    color: "#fecaca",
  },
  emptyRowText: {
    padding: "40px 0",
    color: "#6b7280",
    fontSize: "14px",
  },
};

// map status to colors
const getStatusStyles = (status) => {
  switch (status) {
    case "PLACED":
      return {
        background: "rgba(56,189,248,0.12)",
        borderColor: "rgba(56,189,248,0.4)",
        color: "#e0f2fe",
        dot: "#38bdf8",
      };
    case "SHIPPED":
      return {
        background: "rgba(129,140,248,0.14)",
        borderColor: "rgba(129,140,248,0.45)",
        color: "#e0e7ff",
        dot: "#6366f1",
      };
    case "DELIVERED":
      return {
        background: "rgba(34,197,94,0.16)",
        borderColor: "rgba(34,197,94,0.5)",
        color: "#dcfce7",
        dot: "#22c55e",
      };
    case "CANCELLED":
      return {
        background: "rgba(248,113,113,0.18)",
        borderColor: "rgba(248,113,113,0.55)",
        color: "#fee2e2",
        dot: "#ef4444",
      };
    default:
      return {
        background: "rgba(148,163,184,0.16)",
        borderColor: "rgba(148,163,184,0.5)",
        color: "#e5e7eb",
        dot: "#9ca3af",
      };
  }
};

const Order = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [hoveredOrder, setHoveredOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [baseUrl]);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  if (loading) {
    // note: the spin animation needs a small global CSS:
    // @keyframes spin { to { transform: rotate(360deg); } }
    return (
      <div style={styles.loadingWrapper}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingInner}>
            <div style={styles.loadingRing} />
            <div style={styles.loadingTextMain}>Syncing Orders</div>
            <div style={styles.loadingTextSub}>
              Talking to your server, just a sec…
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorWrapper}>
        <div style={styles.errorCard}>
          <div style={styles.errorTitle}>Order Dashboard Error</div>
          <div style={styles.errorMsg}>{error}</div>
          <div style={styles.errorHint}>
            Check if the API is running, your BASE_URL is correct, and your
            network connection is stable.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.pageInner}>
        <h2 style={styles.pageTitle}>Order Command Center</h2>
        <p style={styles.subtitle}>
          Review, track, and manage every purchase flowing through your store.
        </p>

        <div style={styles.card}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardTitle}>
              <span style={styles.glowingDot} />
              <span style={styles.cardTitleText}>Orders Timeline</span>
            </div>
            <div style={styles.filterChipRow}>
              <span style={styles.filterChip}>
                Total Orders: <strong>{orders.length}</strong>
              </span>
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <div className="table-responsive">
              <table
                className="table table-hover mb-0"
                style={styles.table}
              >
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Items</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        <div style={styles.emptyRowText}>
                          No orders found yet. Once customers start buying,
                          they’ll show up here in real time.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const isExpanded = expandedOrder === order.orderId;
                      const isHovered = hoveredOrder === order.orderId;

                      const rowStyle = {
                        ...styles.baseRow,
                        ...(isHovered ? styles.rowHovered : {}),
                        ...(isExpanded ? styles.rowExpanded : {}),
                      };

                      const statusStyle = getStatusStyles(order.status);

                      return (
                        <React.Fragment key={order.orderId}>
                          <tr
                            style={rowStyle}
                            onMouseEnter={() =>
                              setHoveredOrder(order.orderId)
                            }
                            onMouseLeave={() => setHoveredOrder(null)}
                          >
                            <td style={styles.td}>
                              <span style={styles.orderIdText}>
                                #{order.orderId}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <div style={styles.customerName}>
                                {order.customerName}
                              </div>
                              <div style={styles.customerEmail}>
                                {order.email}
                              </div>
                            </td>
                            <td style={styles.td}>
                              <span style={styles.dateText}>
                                {new Date(
                                  order.orderDate
                                ).toLocaleDateString()}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span
                                style={{
                                  ...styles.badgeBase,
                                  background: statusStyle.background,
                                  borderColor: statusStyle.borderColor,
                                  color: statusStyle.color,
                                }}
                              >
                                <span
                                  style={styles.chipDot(statusStyle.dot)}
                                />
                                {order.status}
                              </span>
                            </td>
                            <td style={{ ...styles.td, ...styles.qtyCell }}>
                              {order.items.length}
                            </td>
                            <td style={{ ...styles.td, ...styles.totalCell }}>
                              {formatCurrency(
                                calculateOrderTotal(order.items)
                              )}
                            </td>
                            <td style={styles.td}>
                              <button
                                style={styles.actionButton(isExpanded)}
                                onClick={() =>
                                  toggleOrderDetails(order.orderId)
                                }
                              >
                                {isExpanded ? "Hide Details" : "View Details"}
                              </button>
                            </td>
                          </tr>

                          {isExpanded && (
                            <tr style={styles.detailsRow}>
                              <td colSpan="7" style={{ padding: 0 }}>
                                <div style={styles.detailsContainer}>
                                  <div style={styles.detailsTitle}>
                                    Order Items
                                  </div>
                                  <div className="table-responsive">
                                    <table
                                      className="table table-sm mb-0"
                                      style={styles.detailsTable}
                                    >
                                      <thead>
                                        <tr>
                                          <th
                                            style={{
                                              ...styles.detailsTh,
                                              borderTop: "none",
                                            }}
                                          >
                                            Product
                                          </th>
                                          <th
                                            style={{
                                              ...styles.detailsTh,
                                              borderTop: "none",
                                              textAlign: "center",
                                            }}
                                          >
                                            Quantity
                                          </th>
                                          <th
                                            style={{
                                              ...styles.detailsTh,
                                              borderTop: "none",
                                              textAlign: "right",
                                            }}
                                          >
                                            Price
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order.items.map(
                                          (item, index) => (
                                            <tr key={index}>
                                              <td
                                                style={
                                                  styles.detailsTd
                                                }
                                              >
                                                {item.productName}
                                              </td>
                                              <td
                                                style={{
                                                  ...styles.detailsTd,
                                                  textAlign:
                                                    "center",
                                                }}
                                              >
                                                {item.quantity}
                                              </td>
                                              <td
                                                style={{
                                                  ...styles.detailsTd,
                                                  textAlign: "right",
                                                }}
                                              >
                                                {formatCurrency(
                                                  item.totalPrice
                                                )}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                        <tr
                                          style={
                                            styles.detailsTotalRow
                                          }
                                        >
                                          <td
                                            colSpan="2"
                                            style={{
                                              ...styles.detailsTd,
                                              ...styles.detailsTotalLabel,
                                              borderBottom: "none",
                                            }}
                                          >
                                            Total
                                          </td>
                                          <td
                                            style={{
                                              ...styles.detailsTd,
                                              ...styles.detailsTotalValue,
                                              borderBottom: "none",
                                            }}
                                          >
                                            {formatCurrency(
                                              calculateOrderTotal(
                                                order.items
                                              )
                                            )}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
