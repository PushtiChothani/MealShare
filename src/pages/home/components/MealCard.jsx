import "../MealCard.css";
import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

function MealCard({
  meal,
  image,
  category,
  name,
  description,
  rating,
  reviews,
  provider,
  distance,
  location,
  quantity,
  stock,
  price,
  originalPrice,
  cartQuantity = 0,
  onAddToCart,
}) {
  const [justAdded, setJustAdded] = useState(false);

  const item = meal || {
    image,
    category,
    name,
    description,
    rating,
    reviews,
    provider,
    distance: distance || location,
    quantity,
    stock,
    price,
    originalPrice,
  };

  const displayImage = item.image || "/image/meal1.png";
  const displayCategory = item.category || "Full Meals";
  const displayName = item.name || "Surplus Meal";
  const displayDesc = item.description || "Fresh surplus food available nearby";
  const displayRating = item.rating || "4.8";
  const displayReviews = item.reviews ? `${item.reviews}` : "100+";
  const displayProvider = item.provider || "Local Partner";
  const displayDistance = item.distance || item.location || "2.0 km";

  const maxStock = item.stock || parseInt(item.quantity) || 10;
  const remainingStock = Math.max(0, maxStock - cartQuantity);

  const formatPrice = (val) => {
    if (val === undefined || val === null) return "";
    if (typeof val === "number") return `₹${val}`;
    return String(val).startsWith("₹") ? val : `₹${val}`;
  };

  const displayPrice = formatPrice(item.price);
  const displayOriginalPrice = formatPrice(item.originalPrice);

  const handleAddClick = () => {
    if (cartQuantity >= maxStock) return;

    if (onAddToCart) {
      onAddToCart(item);
    }

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  const isLimitReached = cartQuantity >= maxStock;

  return (
    <div className={`meal-card ${isLimitReached ? "card-stock-full" : ""}`}>
      <div className="meal-card-image-wrapper">
        <img src={displayImage} alt={displayName} className="meal-card-image" />
        <span className="meal-card-category-badge">{displayCategory}</span>
        {remainingStock <= 3 && remainingStock > 0 && (
          <span className="stock-alert-pill">⚡ Only {remainingStock} left!</span>
        )}
      </div>

      <div className="meal-card-body">
        <div className="meal-card-top">
          <span className="meal-card-category">{displayCategory}</span>
          <div className="meal-card-rating">
            <span className="star-icon">★</span>
            <span className="rating-score">{displayRating}</span>
            <span className="reviews-count">({displayReviews})</span>
          </div>
        </div>

        <h3 className="meal-card-title">{displayName}</h3>
        <p className="meal-card-description">{displayDesc}</p>

        <div className="meal-card-provider">
          <span className="provider-prefix">By</span>{" "}
          <span className="provider-name">{displayProvider}</span>
        </div>

        <div className="meal-card-meta">
          <span className="meta-item">📍 {displayDistance}</span>
          <span className="meta-separator">•</span>
          <span className="meta-item stock-meta-tag">
            {remainingStock > 0 ? (
              <>{remainingStock} available</>
            ) : (
              <span className="stock-zero">Stock limit reached</span>
            )}
          </span>
        </div>

        <div className="meal-card-footer">
          <div className="meal-card-price-group">
            <span className="discounted-price">{displayPrice}</span>
            {displayOriginalPrice && (
              <span className="original-price">{displayOriginalPrice}</span>
            )}
          </div>

          <button
            className={`meal-card-btn ${
              isLimitReached
                ? "stock-full-btn"
                : justAdded
                ? "added-btn"
                : cartQuantity > 0
                ? "in-cart-btn"
                : ""
            }`}
            type="button"
            disabled={isLimitReached}
            onClick={handleAddClick}
          >
            {isLimitReached ? (
              <>
                <AlertCircle size={14} /> Max Added ({maxStock})
              </>
            ) : justAdded ? (
              <>
                <Check size={14} /> Added
              </>
            ) : cartQuantity > 0 ? (
              <>+ Add ({cartQuantity}/{maxStock})</>
            ) : (
              <>🛒 Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
