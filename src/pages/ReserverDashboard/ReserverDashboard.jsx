import { useNavigate } from "react-router-dom";
import AccountMenu from "../../components/AccountMenu";
import "./ReserverDashboard.css";

const dashboardStats = [
  {
    value: "12",
    label: "Meals Rescued",
    description: "Meals you've helped save",
    icon: "♧",
  },
  {
    value: "₹480",
    label: "Money Saved",
    description: "Your total savings",
    icon: "◉",
  },
  {
    value: "8.4 kg",
    label: "CO₂ Prevented",
    description: "Estimated environmental impact",
    icon: "⌁",
  },
];

function ReserverDashboard() {
  const navigate = useNavigate();

  // Profile button
  const handleProfile = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // View Reservation → scroll to Recent Reservations
  const handleViewReservation = () => {
    document
      .querySelector(".recent-reservations-card")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  // See your impact / My impact → scroll to Impact card
  const handleMyImpact = () => {
    document
      .querySelector(".impact-preview-card")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  // View all → scroll to Recent Reservations
  const handleViewAllReservations = () => {
    document
      .querySelector(".recent-reservations-card")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  // Find a meal → Meals page
  const handleFindMeal = () => {
    navigate("/meals");
  };

  // Saved meals → Meals page for now
  const handleSavedMeals = () => {
  navigate("/meals", {
    state: {
      openCart: true,
    },
  });
};

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* =====================================================
            DASHBOARD HEADER
        ===================================================== */}

        <header className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              MY DASHBOARD
            </span>

            <h1>
              Welcome back, <span>MealSharer.</span>
            </h1>

            <p>
              Every meal you rescue makes a small difference.
            </p>
          </div>

          {/* Keep the original AccountMenu so Profile + Logout work */}
          <div className="dashboard-profile">
            <AccountMenu />
          </div>
        </header>

        {/* =====================================================
            DASHBOARD STATISTICS
        ===================================================== */}

        <section className="dashboard-stats">
          {dashboardStats.map((stat) => (
            <article
              className="dashboard-stat-card"
              key={stat.label}
            >
              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-content">
                <strong>
                  {stat.value}
                </strong>

                <h2>
                  {stat.label}
                </h2>

                <p>
                  {stat.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* =====================================================
            UPCOMING MEAL + IMPACT
        ===================================================== */}

        <section className="dashboard-main-grid">

          {/* UPCOMING MEAL */}

          <article className="dashboard-card upcoming-meal-card">
            <div className="dashboard-card-heading">
              <div>
                <span className="card-eyebrow">
                  UP NEXT
                </span>

                <h2>
                  Your rescued meal
                </h2>
              </div>

              <span className="meal-status">
                Reserved
              </span>
            </div>

            <div className="upcoming-meal-content">
              <div className="upcoming-meal-image">
                <span>🥗</span>
              </div>

              <div className="upcoming-meal-details">
                <span className="meal-category">
                  HEALTHY MEAL
                </span>

                <h3>
                  Fresh Veggie Bowl
                </h3>

                <p className="meal-partner">
                  The Green Bowl
                </p>

                <div className="pickup-info">
                  <div>
                    <span>
                      Pickup
                    </span>

                    <strong>
                      Today · 1:30 PM
                    </strong>
                  </div>

                  <div>
                    <span>
                      Location
                    </span>

                    <strong>
                      Vadodara
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="dashboard-primary-button"
              onClick={handleViewReservation}
            >
              View Reservation
              <span>→</span>
            </button>
          </article>

          {/* IMPACT */}

          <article className="dashboard-card impact-preview-card">
            <span className="card-eyebrow">
              YOUR IMPACT
            </span>

            <h2>
              Small actions.
              <br />
              <span>Real change.</span>
            </h2>

            <div className="impact-circle">
              <strong>
                12
              </strong>

              <span>
                meals rescued
              </span>
            </div>

            <p>
              You're helping good food reach people
              instead of going to waste.
            </p>

            <button
              type="button"
              className="dashboard-text-button"
              onClick={handleMyImpact}
            >
              See your impact
              <span>→</span>
            </button>
          </article>
        </section>

        {/* =====================================================
            RECENT RESERVATIONS
        ===================================================== */}

        <section className="dashboard-card recent-reservations-card">
          <div className="dashboard-card-heading">
            <div>
              <span className="card-eyebrow">
                YOUR ACTIVITY
              </span>

              <h2>
                Recent reservations
              </h2>
            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={handleViewAllReservations}
            >
              View all
              <span>→</span>
            </button>
          </div>

          <div className="recent-reservations">

            {/* RESERVATION 1 */}

            <div className="reservation-row">
              <div className="reservation-icon">
                🥗
              </div>

              <div className="reservation-info">
                <h3>
                  Fresh Veggie Bowl
                </h3>

                <p>
                  The Green Bowl
                </p>
              </div>

              <span className="reservation-date">
                Today · 1:30 PM
              </span>

              <span className="reservation-status reserved">
                Reserved
              </span>
            </div>

            {/* RESERVATION 2 */}

            <div className="reservation-row">
              <div className="reservation-icon">
                🥐
              </div>

              <div className="reservation-info">
                <h3>
                  Freshly Baked Croissants
                </h3>

                <p>
                  Bake Affairs
                </p>
              </div>

              <span className="reservation-date">
                Yesterday · 6:00 PM
              </span>

              <span className="reservation-status collected">
                Collected
              </span>
            </div>

            {/* RESERVATION 3 */}

            <div className="reservation-row">
              <div className="reservation-icon">
                🌯
              </div>

              <div className="reservation-info">
                <h3>
                  Healthy Paneer Wrap
                </h3>

                <p>
                  Healthy Bites
                </p>
              </div>

              <span className="reservation-date">
                18 Sep · 2:00 PM
              </span>

              <span className="reservation-status collected">
                Collected
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section className="dashboard-card quick-actions-card">
          <div className="dashboard-card-heading">
            <div>
              <span className="card-eyebrow">
                MAKE A DIFFERENCE
              </span>

              <h2>
                Quick actions
              </h2>
            </div>
          </div>

          <div className="quick-actions">

            {/* FIND A MEAL */}

            <button
              type="button"
              className="quick-action"
              onClick={handleFindMeal}
            >
              <span className="quick-action-icon">
                ⌕
              </span>

              <span className="quick-action-content">
                <strong>
                  Find a meal
                </strong>

                <small>
                  Discover rescued food near you
                </small>
              </span>

              <span className="quick-action-arrow">
                →
              </span>
            </button>

            {/* SAVED MEALS */}

            <button
              type="button"
              className="quick-action"
              onClick={handleSavedMeals}
            >
              <span className="quick-action-icon">
                ♡
              </span>

              <span className="quick-action-content">
                <strong>
                  Saved meals
                </strong>

                <small>
                  View your favorite meals
                </small>
              </span>

              <span className="quick-action-arrow">
                →
              </span>
            </button>

            {/* MY IMPACT */}

            <button
              type="button"
              className="quick-action"
              onClick={handleMyImpact}
            >
              <span className="quick-action-icon">
                ◉
              </span>

              <span className="quick-action-content">
                <strong>
                  My impact
                </strong>

                <small>
                  See your food rescue journey
                </small>
              </span>

              <span className="quick-action-arrow">
                →
              </span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default ReserverDashboard;