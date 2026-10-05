import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./FoodListerDashboard.css";

import {
  getListings,
} from "../../data/listings";


const statCards = [
  {
    label: "Meals Listed",
    value: "28",
    change: "12%",
    className: "listed",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=85",
  },

  {
    label: "Meals Rescued",
    value: "18",
    change: "20%",
    className: "rescued",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=85",
  },

  {
    label: "Food Saved",
    value: "12.4 kg",
    change: "18%",
    className: "saved",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=85",
  },

  {
    label: "Preparing",
    value: "08",
    change: "12.5%",
    className: "preparing",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=500&q=85",
  },
];


const fallbackListings = [
  {
    id: "dashboard-biryani",
    name: "Paneer Biryani",
    description:
      "Fresh homemade paneer biryani with aromatic spices.",
    category: "Indian",
    mealsLeft: 5,
    pickup: "Today, 6:00 PM – 8:00 PM",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=85",
  },

  {
    id: "dashboard-pastries",
    name: "Assorted Pastries",
    description:
      "Fresh cakes and pastries from today's surplus.",
    category: "Bakery",
    mealsLeft: 8,
    pickup: "Today, 4:00 PM – 7:00 PM",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85",
  },

  {
    id: "dashboard-sandwich",
    name: "Veg Sandwich Pack",
    description:
      "Nutritious vegetable sandwiches with fresh ingredients.",
    category: "Snacks",
    mealsLeft: 3,
    pickup: "Tomorrow, 12:00 PM – 3:00 PM",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85",
  },
];


const activities = [
  {
    type: "reservation",
    title: "A student reserved 2 meals",
    subtitle: "Paneer Biryani",
    time: "2 hours ago",
  },

  {
    type: "reservation",
    title: "A student reserved 1 meal",
    subtitle: "Veg Sandwich Pack",
    time: "4 hours ago",
  },

  {
    type: "success",
    title: "Listing published",
    subtitle: "Assorted Pastries",
    time: "6 hours ago",
  },

  {
    type: "impact",
    title: "You reached 30 kg CO₂ prevented!",
    subtitle: "Great impact! Keep it up.",
    time: "1 day ago",
  },
];


function FoodListerDashboard() {

  const navigate =
    useNavigate();


  const [
    listings,
    setListings,
  ] = useState(() =>
    getListings()
  );


  const [
    trendPeriod,
    setTrendPeriod,
  ] = useState(
    "This Week"
  );


  const [
    showAllActivity,
    setShowAllActivity,
  ] = useState(false);


  const [
    openMenu,
    setOpenMenu,
  ] = useState(null);


  useEffect(() => {

    const refreshListings = () => {

      const current =
        getListings();

      setListings(
        current
      );

    };


    refreshListings();


    window.addEventListener(
      "storage",
      refreshListings
    );


    window.addEventListener(
      "mealshare:listings-updated",
      refreshListings
    );


    return () => {

      window.removeEventListener(
        "storage",
        refreshListings
      );

      window.removeEventListener(
        "mealshare:listings-updated",
        refreshListings
      );

    };

  }, []);


  const displayListings =
    listings.length > 0
      ? listings
      : fallbackListings;


  const scrollToListings = () => {

    document
      .getElementById(
        "active-listings"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

  };


  const handleEdit = (
    listing
  ) => {

    navigate(
      "/create-listing",
      {
        state: {
          listing,
        },
      }
    );

  };


  const handleDelete = (
    listing
  ) => {

    const confirmed =
      window.confirm(
        `Remove "${listing.name}" from your listings?`
      );


    if (!confirmed) {
      return;
    }


    const remaining =
      getListings().filter(
        (item) =>
          item.id !== listing.id
      );


    localStorage.setItem(
      "mealshare_listings",
      JSON.stringify(
        remaining
      )
    );


    window.dispatchEvent(
      new CustomEvent(
        "mealshare:listings-updated"
      )
    );


    setListings(
      remaining
    );

  };


  const visibleActivities =
    showAllActivity
      ? activities
      : activities.slice(
          0,
          3
        );


  return (
    <div className="food-lister-dashboard">


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="food-lister-main">


        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <header className="food-lister-topbar">


          <div className="food-lister-welcome">

            <span>
              Welcome back,
            </span>


            <h1>

              The Green Bowl

              <i>
                ⌁
              </i>

            </h1>


            <p>
              Share good food. Create real impact in Vadodara.
            </p>

          </div>


          <div className="food-lister-topbar-actions">


            <div className="food-lister-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search listings, reservations..."
              />

            </div>


            <button
              type="button"
              className="food-lister-notification"
              onClick={() =>
                alert(
                  "You have 3 new notifications."
                )
              }
            >

              ♧

              <span />

            </button>


            <button
              type="button"
              className="food-lister-partner-profile"
              onClick={() =>
                alert(
                  "Partner profile: The Green Bowl"
                )
              }
            >

              <div className="food-lister-partner-avatar">
                GB
              </div>


              <div>

                <strong>
                  The Green Bowl
                </strong>

                <small>
                  Restaurant Partner
                </small>

              </div>


              <span>
                ⌄
              </span>

            </button>

          </div>

        </header>


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="food-lister-stat-grid">

          {statCards.map(
            (stat) => (

              <article
                key={stat.label}
                className={`food-lister-stat ${stat.className}`}
              >

                <div className="food-lister-stat-text">

                  <div className="food-lister-stat-title">

                    <span className="food-lister-stat-icon">

                      {stat.label ===
                        "Meals Listed" &&
                        "🍴"}

                      {stat.label ===
                        "Meals Rescued" &&
                        "⌁"}

                      {stat.label ===
                        "Food Saved" &&
                        "♨"}

                      {stat.label ===
                        "Preparing" &&
                        "♨"}

                    </span>


                    <span>
                      {stat.label}
                    </span>

                  </div>


                  <strong>
                    {stat.value}
                  </strong>


                  <p>

                    <b>
                      ↑ {stat.change}
                    </b>

                    {" "}from last week

                  </p>

                </div>


                <div className="food-lister-stat-image">

                  <img
                    src={stat.image}
                    alt=""
                  />

                </div>

              </article>

            )
          )}

        </section>


        {/* ===================================================
            CONTENT GRID
        =================================================== */}

        <section className="food-lister-content-grid">


          {/* =================================================
              ACTIVE LISTINGS
          ================================================= */}

          <article
            className="food-lister-active-card"
            id="active-listings"
          >


            <div className="food-lister-section-heading">


              <div>

                <div className="food-lister-heading-row">

                  <span className="food-lister-heading-icon">
                    ▤
                  </span>

                  <h2>
                    Active Listings
                  </h2>

                </div>


                <p>
                  Your current food listings available for reservation.
                </p>

              </div>


              <button
                type="button"
                className="food-lister-outline-button"
                onClick={
                  scrollToListings
                }
              >

                View All Listings

                <span>
                  →
                </span>

              </button>

            </div>


            <div className="food-lister-listings-grid">


              {displayListings.map(
                (listing) => (

                  <article
                    className="food-lister-listing-card"
                    key={listing.id}
                  >


                    <div className="food-lister-listing-image">

                      <img
                        src={
                          listing.image ||
                          fallbackListings[0].image
                        }
                        alt={
                          listing.name
                        }
                      />


                      <span className="food-lister-left-badge">

                        {listing.mealsLeft ??
                          listing.meals ??
                          0}

                        {" "}
                        {Number(
                          listing.mealsLeft ??
                            0
                        ) === 1
                          ? "meal left"
                          : "meals left"}

                      </span>


                      <span className="food-lister-active-badge">

                        <i />

                        Active

                      </span>

                    </div>


                    <div className="food-lister-listing-body">


                      <h3>
                        {listing.name}
                      </h3>


                      <p className="food-lister-listing-description">
                        {listing.description}
                      </p>


                      <div className="food-lister-listing-info">


                        <span>
                          🍴{" "}
                          {listing.category ||
                            "Meal"}
                        </span>


                        <span>
                          ♧{" "}
                          {listing.mealsLeft ??
                            0}{" "}
                          meals left
                        </span>


                        <span>
                          ◷{" "}
                          {listing.pickupTime ||
                            listing.pickup ||
                            "Pickup time available"}
                        </span>


                        <strong>
                          ◇ ₹
                          {listing.price ??
                            0}
                        </strong>

                      </div>


                      <div className="food-lister-listing-buttons">


                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              listing
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                listing.id
                                ? null
                                : listing.id
                            )
                          }
                        >
                          •••
                        </button>

                      </div>


                      {openMenu ===
                        listing.id && (

                        <div
                          style={{
                            marginTop:
                              "8px",
                            padding:
                              "10px",
                            borderRadius:
                              "10px",
                            background:
                              "#fff5f1",
                            border:
                              "1px solid #ead2cf",
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            gap: "10px",
                          }}
                        >

                          <span
                            style={{
                              fontSize:
                                "11px",
                              color:
                                "#51202a",
                            }}
                          >
                            Listing options
                          </span>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                listing
                              )
                            }
                            style={{
                              border: 0,
                              background:
                                "transparent",
                              color:
                                "#7d1f2a",
                              fontWeight:
                                700,
                              cursor:
                                "pointer",
                              fontSize:
                                "11px",
                            }}
                          >
                            Delete
                          </button>

                        </div>

                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          </article>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <aside className="food-lister-right-column">


            {/* QUICK ACTIONS */}

            <article className="food-lister-side-card quick-actions-card">


              <div className="food-lister-side-heading">

                <span>
                  ✦
                </span>

                <h2>
                  Quick Actions
                </h2>

              </div>


              <button
                type="button"
                className="food-lister-create-button"
                onClick={() =>
                  navigate(
                    "/create-listing"
                  )
                }
              >

                <span>
                  ＋
                </span>

                Create a New Listing

                <b>
                  →
                </b>

              </button>


              <button
                type="button"
                className="food-lister-manage-button"
                onClick={() =>
                  navigate("/manage-listings")
                }
              >
                 <span>
                  ▤
                </span>

                Manage My Listings

                <b>
                  →
                </b>
                 </button>
              <button
                type="button"
                className="food-lister-manage-button"
                onClick={() =>
                  navigate("/reservations")
                }
              >
                <span>♧</span>

                Manage Reservations

                <b>→</b>
              </button>
              <button
                type="button"
                className="food-lister-manage-button"
                onClick={() =>
                  navigate("/partner-profile")
                }
              >
                <span>◉</span>

                Manage Profile

                <b>→</b>
              </button>
              

            </article>


            {/* WEEKLY TREND */}

            <article className="food-lister-side-card trend-card">


              <div className="food-lister-side-heading">


                <div>

                  <span>
                    ▥
                  </span>

                  <h2>
                    Weekly Rescue Trend
                  </h2>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setTrendPeriod(
                      trendPeriod ===
                        "This Week"
                        ? "Last Week"
                        : "This Week"
                    )
                  }
                >
                  {trendPeriod}⌄
                </button>

              </div>


              <div className="food-lister-trend-summary">

                <strong>
                  18
                </strong>


                <div>

                  <span>
                    Meals Rescued
                  </span>

                  <b>
                    ↑ 20% from last week
                  </b>

                </div>

              </div>


              <div className="food-lister-chart">

                {[
                  5,
                  7,
                  10,
                  12,
                  15,
                  10,
                  7,
                ].map(
                  (
                    value,
                    index
                  ) => (

                    <div
                      className="food-lister-chart-column"
                      key={index}
                    >

                      <div
                        className="food-lister-chart-bar"
                        style={{
                          height: `${value * 5}px`,
                        }}
                      />


                      <span>

                        {
                          [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ][index]
                        }

                      </span>

                    </div>

                  )
                )}

              </div>

            </article>


            {/* RECENT ACTIVITY */}

            <article className="food-lister-side-card activity-card">


              <div className="food-lister-side-heading">


                <div>

                  <span>
                    ◷
                  </span>

                  <h2>
                    Recent Activity
                  </h2>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setShowAllActivity(
                      !showAllActivity
                    )
                  }
                >

                  {showAllActivity
                    ? "Show Less"
                    : "View All"}

                </button>

              </div>


              <div className="food-lister-activity-list">


                {visibleActivities.map(
                  (
                    activity,
                    index
                  ) => (

                    <div
                      className="food-lister-activity"
                      key={index}
                    >

                      <div
                        className={`food-lister-activity-icon ${activity.type}`}
                      >

                        {activity.type ===
                          "success" &&
                          "✓"}

                        {activity.type ===
                          "impact" &&
                          "♥"}

                        {activity.type ===
                          "reservation" &&
                          "🛒"}

                      </div>


                      <div>

                        <strong>
                          {activity.title}
                        </strong>

                        <span>
                          {activity.subtitle}
                        </span>

                      </div>


                      <time>
                        {activity.time}
                      </time>

                    </div>

                  )
                )}

              </div>

            </article>

          </aside>

        </section>

      </main>

    </div>
  );
}


export default FoodListerDashboard;