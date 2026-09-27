import "../styles/cart.css";
import { X, ShoppingBag, Trash2, MapPin, Phone, Plus, Minus, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

function CartModal({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate totals
  const totalAmount = cartItems.reduce((sum, item) => {
    const numericPrice = typeof item.price === "number"
      ? item.price
      : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return sum + numericPrice * (item.cartQuantity || 1);
  }, 0);

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + (item.cartQuantity || 1),
    0
  );

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onClearCart();
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div
        className="cart-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="cart-modal-header">
          <div className="cart-header-title">
            <ShoppingBag className="cart-header-icon" size={22} />
            <h2>Your Reserved Food</h2>
            <span className="cart-header-badge">{totalItemsCount}</span>
          </div>

          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT BODY */}
        <div className="cart-modal-body">
          {isSuccess ? (
            <div className="cart-success-state">
              <CheckCircle className="success-icon" size={60} />
              <h3>Reservation Confirmed!</h3>
              <p>
                Your surplus food reservation has been placed successfully. Please pick up your meals at the specified locations.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-icon-wrapper">
                <ShoppingBag size={48} className="empty-cart-icon" />
              </div>
              <h3>Your Cart is Empty</h3>
              <p>
                Browse surplus meals nearby and click "Add" to reserve food at up to 70% off!
              </p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemPriceNum = typeof item.price === "number"
                  ? item.price
                  : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
                const itemTotal = itemPriceNum * (item.cartQuantity || 1);
                const maxStock = item.stock || parseInt(item.quantity) || 10;
                const isMaxReached = (item.cartQuantity || 1) >= maxStock;

                return (
                  <div key={item.id} className="cart-item-card">
                    {/* Item Image */}
                    <img
                      src={item.image || "/image/meal1.png"}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    {/* Item Details */}
                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <span className="cart-item-category">{item.category}</span>
                        <span className="cart-item-provider">By {item.provider}</span>
                      </div>

                      <h4 className="cart-item-title">{item.name}</h4>

                      {/* Pickup address & contact */}
                      <div className="cart-item-pickup">
                        <div className="cart-item-pickup-row">
                          <MapPin size={12} className="pickup-icon" />
                          <span>{item.address || `${item.distance} • Vadodara`}</span>
                        </div>
                        {item.phone && (
                          <div className="cart-item-pickup-row">
                            <Phone size={12} className="pickup-icon" />
                            <a href={`tel:${item.phone}`} className="cart-item-phone">
                              {item.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Stock limit notice */}
                      {isMaxReached ? (
                        <div className="cart-stock-warning">
                          <AlertTriangle size={12} />
                          <span>Max surplus limit reached ({maxStock} max)</span>
                        </div>
                      ) : (
                        <div className="cart-stock-info">
                          <span>
                            {maxStock - (item.cartQuantity || 1)} surplus portion
                            {maxStock - (item.cartQuantity || 1) > 1 ? "s" : ""} left
                          </span>
                        </div>
                      )}

                      {/* Quantity & Price row */}
                      <div className="cart-item-action-row">
                        <div className="cart-quantity-controls">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() =>
                              onUpdateQuantity(item.id, (item.cartQuantity || 1) - 1)
                            }
                            title="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="qty-number">{item.cartQuantity || 1}</span>

                          <button
                            type="button"
                            className={`qty-btn ${isMaxReached ? "qty-disabled" : ""}`}
                            disabled={isMaxReached}
                            onClick={() =>
                              onUpdateQuantity(item.id, (item.cartQuantity || 1) + 1)
                            }
                            title={
                              isMaxReached
                                ? `Maximum available stock reached (${maxStock})`
                                : "Increase quantity"
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="cart-item-price-group">
                          <span className="cart-item-price">₹{itemTotal}</span>
                          <button
                            type="button"
                            className="remove-item-btn"
                            onClick={() => onRemoveItem(item.id)}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!isSuccess && cartItems.length > 0 && (
          <div className="cart-modal-footer">
            {/* Total Row */}
            <div className="cart-total-row">
              <span className="total-label">Total Amount</span>
              <span className="total-value">₹{totalAmount}</span>
            </div>

            {/* Action Buttons */}
            <div className="cart-footer-buttons">
              <button
                type="button"
                className="clear-cart-btn"
                onClick={onClearCart}
              >
                Clear All
              </button>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Confirm Reservation (₹{totalAmount})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
