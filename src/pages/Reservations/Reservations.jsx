import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Reservations.css";


const reservations = [
  {
    id: "RSV001",
    customer: "Aarav Mehta",
    food: "Veggie Wrap Box",
    category: "Main Course",
    date: "Today, Sep 17",
    time: "2:00 PM",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "RSV002",
    customer: "Diya Shah",
    food: "Pasta Surprise Box",
    category: "Main Course",
    date: "Today, Sep 17",
    time: "4:30 PM",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "RSV003",
    customer: "Rohan Patel",
    food: "Mixed Bakery Box",
    category: "Bakery",
    date: "Tomorrow, Sep 18",
    time: "11:00 AM",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "RSV004",
    customer: "Sneha Joshi",
    food: "South Indian Meal",
    category: "Main Course",
    date: "Tomorrow, Sep 18",
    time: "1:00 PM",
    status: "Picked Up",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80",
  },

  {
    id: "RSV005",
    customer: "Kunal Verma",
    food: "Salad Box",
    category: "Healthy",
    date: "Tomorrow, Sep 18",
    time: "3:30 PM",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80",
  },
];


function Reservations() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [pickupFilter, setPickupFilter] =
    useState("All Dates");

  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [selectedReservation, setSelectedReservation] =
    useState(null);


  /* =========================================================
     COUNTS
  ========================================================= */

  const counts = useMemo(() => {
    return {
      All: reservations.length,

      Pending: reservations.filter(
        (item) =>
          item.status === "Pending"
      ).length,

      Confirmed: reservations.filter(
        (item) =>
          item.status === "Confirmed"
      ).length,

      "Picked Up": reservations.filter(
        (item) =>
          item.status === "Picked Up"
      ).length,

      Cancelled: reservations.filter(
        (item) =>
          item.status === "Cancelled"
      ).length,
    };
  }, []);


  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredReservations = useMemo(() => {
    let result = [
      ...reservations,
    ];


    if (activeTab !== "All") {
      result = result.filter(
        (item) =>
          item.status === activeTab
      );
    }


    if (search.trim()) {
      const value =
        search
          .trim()
          .toLowerCase();

      result = result.filter(
        (item) =>
          item.customer
            .toLowerCase()
            .includes(value) ||
          item.food
            .toLowerCase()
            .includes(value) ||
          item.id
            .toLowerCase()
            .includes(value)
      );
    }


    if (
      statusFilter !==
      "All Status"
    ) {
      result = result.filter(
        (item) =>
          item.status ===
          statusFilter
      );
    }


    if (
      pickupFilter !==
      "All Dates"
    ) {
      result = result.filter(
        (item) =>
          item.date ===
          pickupFilter
      );
    }


    if (
      categoryFilter !==
      "All Categories"
    ) {
      result = result.filter(
        (item) =>
          item.category ===
          categoryFilter
      );
    }


    return result;
  }, [
    activeTab,
    search,
    statusFilter,
    pickupFilter,
    categoryFilter,
  ]);


  /* =========================================================
     BACK
  ========================================================= */

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(
        "/food-lister-dashboard"
      );
    }
  };


  /* =========================================================
     VIEW RESERVATION
  ========================================================= */

  const handleView = (
    reservation
  ) => {
    setSelectedReservation(
      reservation
    );
  };


  return (
    <main className="reservations-page">

      <div className="reservations-container">

        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <div className="reservations-breadcrumb">

          <button
            type="button"
            onClick={handleBack}
            className="reservations-back-button"
          >
            ← Back
          </button>

          <span>
            Dashboard
          </span>

          <b>
            ›
          </b>

          <strong>
            Reservations
          </strong>

        </div>


        {/* ===================================================
            HEADER
        =================================================== */}

        <section className="reservations-header">

          <div>

            <h1>
              Reservations
            </h1>

            <p>
              View and manage all meal
              reservations from customers.
            </p>

          </div>


          <button
            type="button"
            className="reservations-date-button"
          >
            <span>
              ◷
            </span>

            This Week

            <b>
              ⌄
            </b>
          </button>

        </section>


        {/* ===================================================
            MAIN PANEL
        =================================================== */}

        <section className="reservations-panel">

          {/* =================================================
              TABS
          ================================================= */}

          <div className="reservations-tabs">

            {[
              "All",
              "Pending",
              "Confirmed",
              "Picked Up",
              "Cancelled",
            ].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
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
                      counts[
                        tab
                      ]
                    }
                  </span>

                </button>
              )
            )}

          </div>


          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="reservations-filters">

            <label className="reservations-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by customer name or meal..."
              />

            </label>


            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option>
                All Status
              </option>

              <option>
                Pending
              </option>

              <option>
                Confirmed
              </option>

              <option>
                Picked Up
              </option>

              <option>
                Cancelled
              </option>

            </select>


            <select
              value={pickupFilter}
              onChange={(event) =>
                setPickupFilter(
                  event.target.value
                )
              }
            >

              <option>
                All Dates
              </option>

              <option>
                Today, Sep 17
              </option>

              <option>
                Tomorrow, Sep 18
              </option>

            </select>


            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(
                  event.target.value
                )
              }
            >

              <option>
                All Categories
              </option>

              <option>
                Main Course
              </option>

              <option>
                Bakery
              </option>

              <option>
                Healthy
              </option>

            </select>

          </div>


          {/* =================================================
              TABLE
          ================================================= */}

          <div className="reservations-table-wrapper">

            <table className="reservations-table">

              <thead>

                <tr>

                  <th>
                    Customer
                  </th>

                  <th>
                    Food Item
                  </th>

                  <th>
                    Pickup Date & Time
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredReservations.map(
                  (reservation) => (

                    <tr
                      key={
                        reservation.id
                      }
                    >

                      {/* CUSTOMER */}

                      <td>

                        <div className="reservation-customer">

                          <div className="reservation-avatar">
                            {
                              reservation.customer
                                .charAt(0)
                            }
                          </div>

                          <div>

                            <strong>
                              {
                                reservation.customer
                              }
                            </strong>

                            <span>
                              #
                              {
                                reservation.id
                              }
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* FOOD */}

                      <td>

                        <div className="reservation-food">

                          <img
                            src={
                              reservation.image
                            }
                            alt={
                              reservation.food
                            }
                          />

                          <div>

                            <strong>
                              {
                                reservation.food
                              }
                            </strong>

                            <span>
                              {
                                reservation.category
                              }
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* PICKUP */}

                      <td>

                        <div className="reservation-pickup">

                          <strong>
                            {
                              reservation.date
                            }
                          </strong>

                          <span>
                            {
                              reservation.time
                            }
                          </span>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`reservation-status reservation-status-${reservation.status
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {
                            reservation.status
                          }
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="reservation-actions">

                          <button
                            type="button"
                            onClick={() =>
                              handleView(
                                reservation
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="reservation-more-button"
                            aria-label={`More options for ${reservation.customer}`}
                          >
                            •••
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>


            {filteredReservations.length ===
              0 && (
              <div className="reservations-empty">

                <span>
                  ◌
                </span>

                <strong>
                  No reservations found
                </strong>

                <p>
                  Try changing your filters
                  or search term.
                </p>

              </div>
            )}

          </div>

        </section>


        {/* ===================================================
            RESERVATION DETAIL MODAL
        =================================================== */}

        {selectedReservation && (
          <div
            className="reservation-modal-overlay"
            onClick={() =>
              setSelectedReservation(
                null
              )
            }
          >

            <div
              className="reservation-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                className="reservation-modal-close"
                onClick={() =>
                  setSelectedReservation(
                    null
                  )
                }
              >
                ×
              </button>


              <span className="reservation-modal-label">
                RESERVATION DETAILS
              </span>


              <h2>
                {
                  selectedReservation.food
                }
              </h2>


              <div className="reservation-modal-customer">

                <div className="reservation-avatar">
                  {
                    selectedReservation.customer.charAt(
                      0
                    )
                  }
                </div>

                <div>

                  <strong>
                    {
                      selectedReservation.customer
                    }
                  </strong>

                  <span>
                    #
                    {
                      selectedReservation.id
                    }
                  </span>

                </div>

              </div>


              <div className="reservation-modal-details">

                <div>
                  <span>
                    Pickup
                  </span>

                  <strong>
                    {
                      selectedReservation.date
                    }
                    <br />
                    {
                      selectedReservation.time
                    }
                  </strong>
                </div>


                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {
                      selectedReservation.category
                    }
                  </strong>
                </div>


                <div>
                  <span>
                    Status
                  </span>

                  <strong>
                    {
                      selectedReservation.status
                    }
                  </strong>
                </div>

              </div>


              <button
                type="button"
                className="reservation-modal-done"
                onClick={() =>
                  setSelectedReservation(
                    null
                  )
                }
              >
                Close
              </button>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}

export default Reservations;