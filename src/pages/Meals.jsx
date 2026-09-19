import "../styles/Meals.css";

function Meals() {
  return (
    <div className="meals-page">

      {/* Doodle background */}
      <img
        src="/image/doodles.png"
        alt=""
        className="meals-doodle-background"
      />

      {/* Text/content placed over the background */}
      <div className="meals-content">

        {/* Badge */}
        <div className="meals-badge">
          <span className="badge-icon">🌱</span>
          <span>SURPLUS FOOD RESCUE • VADODARA</span>
        </div>

        {/* Heading */}
        <h1>Find Meals Near You</h1>

        {/* Description */}
        <p className="meals-description">
          Discover and reserve available surplus food nearby from local bakeries,
          kitchens, and grocers before it goes to waste. Delicious meals at up to
          70% off.
        </p>

        {/* Information pills */}
        <div className="meals-info">

          <div className="info-pill">
            <span>📍</span>
            <span>Vadodara City</span>
          </div>

          <div className="info-pill">
            <span>🛍️</span>
            <span>120+ Surplus Meals Available</span>
          </div>

          <div className="info-pill">
            <span>🏷️</span>
            <span>Avg. 65% Savings</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Meals;