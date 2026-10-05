import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ManageListings.css";

import { getListings } from "../../data/listings";


/* =========================================================
   STATUS HELPERS
========================================================= */

function getListingStatus(listing) {
  if (Number(listing.mealsLeft) <= 0) {
    return "Ended";
  }

  if (listing.status) {
    return listing.status;
  }

  if (listing.pickupDate) {
    const pickupDate = new Date(
      `${listing.pickupDate}T00:00:00`
    );

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    if (pickupDate > today) {
      return "Scheduled";
    }
  }

  return "Active";
}


/* =========================================================
   PICKUP DISPLAY
========================================================= */

function formatPickup(listing) {
  if (!listing.pickupDate) {
    return listing.pickupTime || "Pickup time not set";
  }

  const pickupDate = new Date(
    `${listing.pickupDate}T00:00:00`
  );

  if (Number.isNaN(pickupDate.getTime())) {
    return listing.pickupTime || "Pickup time not set";
  }

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const tomorrow = new Date(today);

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  let dateLabel;

  if (
    pickupDate.getTime() ===
    today.getTime()
  ) {
    dateLabel = "Today";
  } else if (
    pickupDate.getTime() ===
    tomorrow.getTime()
  ) {
    dateLabel = "Tomorrow";
  } else {
    dateLabel = pickupDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }

  if (getListingStatus(listing) === "Ended") {
    dateLabel = `Ended, ${pickupDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    )}`;
  }

  return listing.pickupTime
    ? `${dateLabel}, ${listing.pickupTime}`
    : dateLabel;
}


/* =========================================================
   NORMALIZE LISTING DATA
========================================================= */

function normalizeListing(listing) {
  return {
    ...listing,

    status: getListingStatus(
      listing
    ),

    meals: Number(
      listing.mealsLeft || 0
    ),

    price: Number(
      listing.discountedPrice ??
        listing.price ??
        0
    ),

    category:
      listing.category ||
      "Other",

    image:
      listing.image ||
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",

    pickup:
      formatPickup(listing),
  };
}


/* =========================================================
   COMPONENT
========================================================= */

function ManageListings() {
  const navigate = useNavigate();

  const [
    listings,
    setListings,
  ] = useState(() =>
    getListings()
  );

  const [
    activeTab,
    setActiveTab,
  ] = useState("All");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("All Categories");

  const [
    status,
    setStatus,
  ] = useState("All Status");

  const [
    sort,
    setSort,
  ] = useState("Newest First");


  /* =======================================================
     REFRESH SHARED LISTINGS
  ======================================================= */

  useEffect(() => {
    const refreshListings = () => {
      setListings(
        getListings()
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


  /* =======================================================
     NORMALIZED LISTINGS
  ======================================================= */

  const normalizedListings = useMemo(() => {
    return listings.map(
      normalizeListing
    );
  }, [listings]);


  /* =======================================================
     TAB COUNTS
  ======================================================= */

  const listingCounts = useMemo(() => {
    return {
      All: normalizedListings.length,

      Active:
        normalizedListings.filter(
          (item) =>
            item.status === "Active"
        ).length,

      Scheduled:
        normalizedListings.filter(
          (item) =>
            item.status === "Scheduled"
        ).length,

      Ended:
        normalizedListings.filter(
          (item) =>
            item.status === "Ended"
        ).length,
    };
  }, [normalizedListings]);


  /* =======================================================
     CATEGORY OPTIONS
  ======================================================= */

  const categoryOptions = useMemo(() => {
    const categories = normalizedListings
      .map(
        (item) =>
          item.category
      )
      .filter(Boolean);

    return [
      ...new Set(categories),
    ];
  }, [normalizedListings]);


  /* =======================================================
     FILTER + SEARCH + SORT
  ======================================================= */

  const filteredListings = useMemo(() => {
    let result = [
      ...normalizedListings,
    ];


    /* TAB */

    if (activeTab !== "All") {
      result =
        result.filter(
          (item) =>
            item.status ===
            activeTab
        );
    }


    /* SEARCH */

    if (search.trim()) {
      const value =
        search
          .trim()
          .toLowerCase();

      result =
        result.filter(
          (item) =>
            item.name
              ?.toLowerCase()
              .includes(value) ||
            item.category
              ?.toLowerCase()
              .includes(value) ||
            item.restaurantName
              ?.toLowerCase()
              .includes(value)
        );
    }


    /* CATEGORY */

    if (
      category !==
      "All Categories"
    ) {
      result =
        result.filter(
          (item) =>
            item.category ===
            category
        );
    }


    /* STATUS */

    if (
      status !==
      "All Status"
    ) {
      result =
        result.filter(
          (item) =>
            item.status ===
            status
        );
    }


    /* SORT */

    if (
      sort ===
      "Price: Low to High"
    ) {
      result.sort(
        (a, b) =>
          a.price - b.price
      );
    }


    if (
      sort ===
      "Meals: High to Low"
    ) {
      result.sort(
        (a, b) =>
          b.meals - a.meals
      );
    }


    return result;
  }, [
    normalizedListings,
    activeTab,
    search,
    category,
    status,
    sort,
  ]);


  /* =======================================================
     EDIT LISTING
  ======================================================= */

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


  /* =======================================================
     CREATE NEW LISTING
  ======================================================= */

  const handleCreateListing = () => {
    navigate(
      "/create-listing"
    );
  };


  return (
    <main className="manage-listings-page">

      <div className="manage-listings-container">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="manage-listings-breadcrumb">

          <span>
            Dashboard
          </span>

          <b>
            ›
          </b>

          <strong>
            Manage Listings
          </strong>

        </div>


        {/* =================================================
            HEADER
        ================================================= */}

        <section className="manage-listings-header">

          <div>

            <h1>
              Your Food Listings
            </h1>

            <p>
              Manage, edit or remove your active and past listings.
            </p>

          </div>


          <button
            className="manage-create-button"
            onClick={
              handleCreateListing
            }
          >

            <span>
              ＋
            </span>

            Create New Listing

          </button>

        </section>


        {/* =================================================
            MAIN PANEL
        ================================================= */}

        <section className="manage-listings-panel">

          {/* ===============================================
              TABS
          =============================================== */}

          <div className="manage-tabs">

            {[
              "All",
              "Active",
              "Scheduled",
              "Ended",
            ].map(
              (tab) => (
                <button
                  key={tab}
                  className={
                    activeTab === tab
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveTab(
                      tab
                    )
                  }
                >

                  {tab}

                  <span>
                    {
                      listingCounts[
                        tab
                      ]
                    }
                  </span>

                </button>
              )
            )}

          </div>


          {/* ===============================================
              FILTERS
          =============================================== */}

          <div className="manage-filters">

            {/* SEARCH */}

            <label className="manage-search">

              <span>
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search listings..."
              />

            </label>


            {/* CATEGORY */}

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
            >

              <option>
                All Categories
              </option>

              {categoryOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>


            {/* STATUS */}

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
            >

              <option>
                All Status
              </option>

              <option>
                Active
              </option>

              <option>
                Scheduled
              </option>

              <option>
                Ended
              </option>

            </select>


            {/* SORT */}

            <select
              value={sort}
              onChange={(event) =>
                setSort(
                  event.target.value
                )
              }
            >

              <option>
                Newest First
              </option>

              <option>
                Price: Low to High
              </option>

              <option>
                Meals: High to Low
              </option>

            </select>

          </div>


          {/* ===============================================
              LISTING GRID
          =============================================== */}

          <div className="manage-listings-grid">

            {filteredListings.map(
              (listing) => (

                <article
                  className="manage-listing-card"
                  key={listing.id}
                >

                  {/* IMAGE */}

                  <div className="manage-listing-image">

                    <img
                      src={listing.image}
                      alt={listing.name}
                    />

                    <span
                      className={`listing-status ${listing.status.toLowerCase()}`}
                    >
                      {listing.status}
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div className="manage-listing-content">

                    <span className="manage-listing-category">
                      {listing.category}
                    </span>


                    <h2>
                      {listing.name}
                    </h2>


                    <div className="manage-price-row">

                      <strong>
                        ₹{listing.price}
                      </strong>


                      {listing.originalPrice &&
                        Number(
                          listing.originalPrice
                        ) >
                          Number(
                            listing.price
                          ) && (
                          <del>
                            ₹
                            {
                              listing.originalPrice
                            }
                          </del>
                        )}


                      {listing.status ===
                        "Active" && (
                        <span>
                          {
                            listing.meals
                          }{" "}
                          left
                        </span>
                      )}

                    </div>


                    <p>
                      Pickup:{" "}
                      {listing.pickup}
                    </p>


                    {/* ACTIONS */}

                    <div className="manage-card-actions">

                      <button
                        onClick={() =>
                          handleEdit(
                            listing
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        aria-label={`More options for ${listing.name}`}
                        type="button"
                      >
                        •••
                      </button>

                    </div>

                  </div>

                </article>

              )
            )}

          </div>


          {/* ===============================================
              EMPTY STATE
          =============================================== */}

          {filteredListings.length ===
            0 && (
            <div className="manage-empty">

              No listings match your current filters.

            </div>
          )}

        </section>

      </div>

    </main>
  );
}

export default ManageListings;