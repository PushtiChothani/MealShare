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
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* Dashboard Header */}
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

          <div className="dashboard-profile">
            <div className="profile-avatar">
              M
            </div>

            <div className="profile-info">
              <strong>MealSharer</strong>
              <span>Vadodara</span>
            </div>

            <span className="profile-arrow">
              ⌄
            </span>
          </div>
        </header>


        {/* Dashboard Statistics */}
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
                <strong>{stat.value}</strong>

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


        {/* Upcoming Meal + Impact */}
        <section className="dashboard-main-grid">

          {/* Upcoming Meal */}
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
                    <span>Pickup</span>

                    <strong>
                      Today · 1:30 PM
                    </strong>
                  </div>

                  <div>
                    <span>Location</span>

                    <strong>
                      Vadodara
                    </strong>
                  </div>

                </div>

              </div>

            </div>


            <button className="dashboard-primary-button">
              View Reservation
              <span>→</span>
            </button>

          </article>


          {/* Impact */}
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
              <strong>12</strong>

              <span>
                meals rescued
              </span>
            </div>


            <p>
              You're helping good food reach people
              instead of going to waste.
            </p>


            <button className="dashboard-text-button">
              See your impact
              <span>→</span>
            </button>

          </article>

        </section>


        {/* Recent Reservations */}
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

            <button className="view-all-button">
              View all
              <span>→</span>
            </button>

          </div>


          <div className="recent-reservations">

            {/* Reservation 1 */}
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


            {/* Reservation 2 */}
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


            {/* Reservation 3 */}
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
<section className="dashboard-card quick-actions-card">
  <div className="dashboard-card-heading">
    <div>
      <span className="card-eyebrow">MAKE A DIFFERENCE</span>
      <h2>Quick actions</h2>
    </div>
  </div>

  <div className="quick-actions">

    <button className="quick-action">
      <span className="quick-action-icon">⌕</span>

      <span className="quick-action-content">
        <strong>Find a meal</strong>
        <small>Discover rescued food near you</small>
      </span>

      <span className="quick-action-arrow">→</span>
    </button>

    <button className="quick-action">
      <span className="quick-action-icon">♡</span>

      <span className="quick-action-content">
        <strong>Saved meals</strong>
        <small>View your favorite meals</small>
      </span>

      <span className="quick-action-arrow">→</span>
    </button>

    <button className="quick-action">
      <span className="quick-action-icon">◉</span>

      <span className="quick-action-content">
        <strong>My impact</strong>
        <small>See your food rescue journey</small>
      </span>

      <span className="quick-action-arrow">→</span>
    </button>

  </div>
</section>

      </div>
    </div>
  );
}

export default ReserverDashboard;