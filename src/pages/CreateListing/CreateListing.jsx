import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./CreateListing.css";

import { saveListing } from "../../data/listings";

const DEFAULT_LOCATION = [22.3072, 73.1812];

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
}

function CreateListing() {
  const navigate = useNavigate();
  const location = useLocation();

  const editingListing = location.state?.listing || null;

  const [mealName, setMealName] = useState(
    editingListing?.name || ""
  );

  const [category, setCategory] = useState(
    editingListing?.category || "Main Course"
  );

  const [description, setDescription] = useState(
    editingListing?.description || ""
  );

  const [quantity, setQuantity] = useState(
    editingListing?.mealsLeft ||
      editingListing?.quantity ||
      ""
  );

  const [originalPrice, setOriginalPrice] = useState(
    editingListing?.originalPrice ||
      editingListing?.price ||
      ""
  );

  const [discountedPrice, setDiscountedPrice] = useState(
    editingListing?.discountedPrice ||
      editingListing?.price ||
      ""
  );

  const [pickupDate, setPickupDate] = useState(
    editingListing?.pickupDate || ""
  );

  const [pickupTime, setPickupTime] = useState(
    editingListing?.pickupTime || "4:00 PM – 7:00 PM"
  );

  const [restaurantName, setRestaurantName] = useState(
    editingListing?.restaurantName || "The Green Bowl"
  );

  const [address, setAddress] = useState(
    editingListing?.address ||
      "The Green Bowl, Alkapuri, Vadodara"
  );

  const [selectedLocation, setSelectedLocation] =
    useState(
      editingListing?.position || null
    );

  const [photo, setPhoto] = useState(
    editingListing?.image || ""
  );

  const [isPublishing, setIsPublishing] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  /* =========================================================
     BACK BUTTON
  ========================================================= */

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    if (editingListing) {
      navigate("/manage-listings");
      return;
    }

    navigate("/food-lister-dashboard");
  };

  /* =========================================================
     PHOTO UPLOAD
  ========================================================= */

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(
        "Please choose an image smaller than 5 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  /* =========================================================
     PUBLISH / UPDATE LISTING
  ========================================================= */

  const handlePublish = (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!mealName.trim()) {
      setErrorMessage("Please enter a meal name.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage(
        "Please add a description for the meal."
      );
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setErrorMessage(
        "Please enter the available quantity."
      );
      return;
    }

    if (
      !discountedPrice ||
      Number(discountedPrice) < 0
    ) {
      setErrorMessage(
        "Please enter a valid discounted price."
      );
      return;
    }

    if (!pickupDate) {
      setErrorMessage(
        "Please select a pickup date."
      );
      return;
    }

    if (!address.trim()) {
      setErrorMessage(
        "Please enter the pickup address."
      );
      return;
    }

    setIsPublishing(true);

    const listing = {
      id:
        editingListing?.id ||
        `listing-${Date.now()}`,

      name: mealName.trim(),

      description:
        description.trim(),

      category,

      mealsLeft:
        Number(quantity),

      price:
        Number(discountedPrice),

      originalPrice:
        Number(
          originalPrice || discountedPrice
        ),

      discountedPrice:
        Number(discountedPrice),

      pickupDate,

      pickupTime,

      restaurantName:
        restaurantName.trim(),

      address:
        address.trim(),

      city: "Vadodara",

      position:
        selectedLocation ||
        DEFAULT_LOCATION,

      image:
        photo ||
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    };

    saveListing(listing);

    setTimeout(() => {
      setIsPublishing(false);

      navigate("/food-lister-dashboard");
    }, 300);
  };

  /* =========================================================
     SAVE DRAFT
  ========================================================= */

  const handleSaveDraft = () => {
    setErrorMessage(
      "Draft saving will be connected to the backend later."
    );
  };

  /* =========================================================
     DISCOUNT CALCULATION
  ========================================================= */

  const discountPercentage =
    Number(originalPrice) > 0 &&
    Number(discountedPrice) >= 0
      ? Math.max(
          0,
          Math.round(
            ((Number(originalPrice) -
              Number(discountedPrice)) /
              Number(originalPrice)) *
              100
          )
        )
      : 0;

  return (
    <main className="create-listing-page">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="create-listing-container">

        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <div className="create-listing-breadcrumb">
          <span>Dashboard</span>
          <b>›</b>

          <strong>
            {editingListing
              ? "Edit Listing"
              : "Create Listing"}
          </strong>
        </div>


        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <header className="create-listing-header">

          <div className="create-listing-header-main">

            {/* BACK BUTTON */}

            <button
              type="button"
              className="create-listing-back-button"
              onClick={handleBack}
            >
              <span>←</span>
              Back
            </button>


            <div>

              <h1>
                {editingListing
                  ? "Edit Your Listing"
                  : "Create a New Listing"}
              </h1>

              <p>
                List your surplus food and help it
                reach someone who needs it.
              </p>

            </div>

          </div>

        </header>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <form
          className="create-listing-layout"
          onSubmit={handlePublish}
        >

          {/* ===================================================
              LEFT COLUMN
          =================================================== */}

          <div className="create-listing-form-column">

            {/* =================================================
                FOOD DETAILS
            ================================================= */}

            <section className="listing-card">

              <div className="listing-card-heading">

                <div>

                  <span>01</span>

                  <div>

                    <h2>
                      Food Details
                    </h2>

                    <p>
                      Tell MealSharers what food
                      you have available.
                    </p>

                  </div>

                </div>

              </div>


              <div className="listing-fields-grid">

                {/* MEAL NAME */}

                <div className="listing-field full-width">

                  <label>
                    Meal Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={mealName}
                    onChange={(event) =>
                      setMealName(
                        event.target.value
                      )
                    }
                    placeholder="e.g. Veggie Delight Box"
                  />

                </div>


                {/* CATEGORY */}

                <div className="listing-field">

                  <label>
                    Category
                    <span>*</span>
                  </label>

                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(
                        event.target.value
                      )
                    }
                  >

                    <option>
                      Main Course
                    </option>

                    <option>
                      Healthy Meal
                    </option>

                    <option>
                      Bakery
                    </option>

                    <option>
                      Snacks
                    </option>

                    <option>
                      Desserts
                    </option>

                    <option>
                      Beverages
                    </option>

                  </select>

                </div>


                {/* QUANTITY */}

                <div className="listing-field">

                  <label>
                    Quantity Available
                    <span>*</span>
                  </label>

                  <div className="input-with-suffix">

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(event) =>
                        setQuantity(
                          event.target.value
                        )
                      }
                      placeholder="10"
                    />

                    <span>
                      boxes
                    </span>

                  </div>

                </div>


                {/* DESCRIPTION */}

                <div className="listing-field full-width">

                  <label>
                    Description
                    <span>*</span>
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(
                        event.target.value.slice(
                          0,
                          300
                        )
                      )
                    }
                    placeholder="Describe the food, ingredients, portions, and anything MealSharers should know."
                    rows="4"
                  />

                  <small className="field-counter">
                    {description.length}/300
                  </small>

                </div>


                {/* ORIGINAL PRICE */}

                <div className="listing-field">

                  <label>
                    Original Price (₹)
                  </label>

                  <div className="input-with-prefix">

                    <span>
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={originalPrice}
                      onChange={(event) =>
                        setOriginalPrice(
                          event.target.value
                        )
                      }
                      placeholder="250"
                    />

                  </div>

                </div>


                {/* DISCOUNTED PRICE */}

                <div className="listing-field">

                  <label>
                    Discounted Price (₹)
                    <span>*</span>
                  </label>

                  <div className="price-input-row">

                    <div className="input-with-prefix">

                      <span>
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        value={discountedPrice}
                        onChange={(event) =>
                          setDiscountedPrice(
                            event.target.value
                          )
                        }
                        placeholder="80"
                      />

                    </div>


                    {discountPercentage > 0 && (
                      <span className="discount-pill">
                        {discountPercentage}% OFF
                      </span>
                    )}

                  </div>

                </div>


                {/* PHOTO */}

                <div className="listing-field full-width">

                  <label>
                    Food Photo

                    <span className="optional">
                      (optional)
                    </span>
                  </label>


                  <label className="photo-upload-box">

                    {photo ? (
                      <img
                        src={photo}
                        alt="Food preview"
                      />
                    ) : (
                      <>

                        <span className="upload-icon">
                          ↑
                        </span>

                        <strong>
                          Upload a food photo
                        </strong>

                        <small>
                          JPG, PNG or WEBP ·
                          Maximum 5 MB
                        </small>

                      </>
                    )}


                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={
                        handlePhotoChange
                      }
                    />

                  </label>

                </div>

              </div>

            </section>


            {/* =================================================
                PICKUP DETAILS
            ================================================= */}

            <section className="listing-card">

              <div className="listing-card-heading">

                <div>

                  <span>02</span>

                  <div>

                    <h2>
                      Pickup Details
                    </h2>

                    <p>
                      Tell MealSharers when and
                      where they can collect it.
                    </p>

                  </div>

                </div>

              </div>


              <div className="listing-fields-grid">

                {/* DATE */}

                <div className="listing-field">

                  <label>
                    Pickup Date
                    <span>*</span>
                  </label>

                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(event) =>
                      setPickupDate(
                        event.target.value
                      )
                    }
                  />

                </div>


                {/* TIME */}

                <div className="listing-field">

                  <label>
                    Pickup Time Slot
                    <span>*</span>
                  </label>

                  <select
                    value={pickupTime}
                    onChange={(event) =>
                      setPickupTime(
                        event.target.value
                      )
                    }
                  >

                    <option>
                      4:00 PM – 7:00 PM
                    </option>

                    <option>
                      12:00 PM – 3:00 PM
                    </option>

                    <option>
                      5:00 PM – 8:00 PM
                    </option>

                    <option>
                      6:00 PM – 9:00 PM
                    </option>

                  </select>

                </div>


                {/* RESTAURANT */}

                <div className="listing-field">

                  <label>
                    Store / Restaurant Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(event) =>
                      setRestaurantName(
                        event.target.value
                      )
                    }
                  />

                </div>


                {/* ADDRESS */}

                <div className="listing-field">

                  <label>
                    Pickup Address
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={address}
                    onChange={(event) =>
                      setAddress(
                        event.target.value
                      )
                    }
                    placeholder="Enter full pickup address"
                  />

                </div>

              </div>


              {/* =================================================
                  MAP
              ================================================= */}

              <div className="listing-map-section">

                <div className="map-heading">

                  <div>

                    <strong>
                      Pickup Location
                    </strong>

                    <span>
                      Click anywhere on the map
                      to set the exact pickup
                      location.
                    </span>

                  </div>


                  {selectedLocation && (
                    <span className="location-selected">
                      ✓ Location selected
                    </span>
                  )}

                </div>


                <div className="listing-map">

                  <MapContainer
                    center={
                      selectedLocation ||
                      DEFAULT_LOCATION
                    }
                    zoom={14}
                    scrollWheelZoom={false}
                    zoomControl={true}
                  >

                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    <MapClickHandler
                      onSelect={
                        setSelectedLocation
                      }
                    />


                    {selectedLocation && (
                      <CircleMarker
                        center={
                          selectedLocation
                        }
                        radius={10}
                        pathOptions={{
                          color: "#7d1f2a",
                          fillColor: "#ef5361",
                          fillOpacity: 0.9,
                          weight: 3,
                        }}
                      />
                    )}

                  </MapContainer>


                  {!selectedLocation && (
                    <div className="map-instruction">

                      <span>
                        ⌖
                      </span>

                      Click the map to select
                      pickup location

                    </div>
                  )}

                </div>

              </div>

            </section>


            {/* =================================================
                ERROR
            ================================================= */}

            {errorMessage && (
              <div className="listing-error">
                {errorMessage}
              </div>
            )}


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="listing-form-actions">

              <button
                type="submit"
                className="publish-listing-button"
                disabled={isPublishing}
              >

                {isPublishing
                  ? "Publishing..."
                  : editingListing
                  ? "Update Listing"
                  : "Publish Listing"}

                <span>
                  →
                </span>

              </button>


              <button
                type="button"
                className="save-draft-button"
                onClick={handleSaveDraft}
              >
                Save as Draft
              </button>

            </div>

          </div>


          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}

          <aside className="create-listing-preview-column">

            {/* =================================================
                LISTING PREVIEW
            ================================================= */}

            <section className="listing-preview-card">

              <div className="preview-heading">

                <div>

                  <span>
                    PREVIEW
                  </span>

                  <h2>
                    Listing Preview
                  </h2>

                </div>


                <span className="preview-live">
                  Live
                </span>

              </div>


              <div className="preview-meal-card">

                {/* IMAGE */}

                <div className="preview-meal-image">

                  <img
                    src={
                      photo ||
                      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85"
                    }
                    alt={
                      mealName ||
                      "Meal preview"
                    }
                  />


                  <span className="preview-pickup-badge">
                    ✓ Pickup Only
                  </span>

                </div>


                {/* CONTENT */}

                <div className="preview-meal-content">

                  <span className="preview-category">
                    {category ||
                      "MAIN COURSE"}
                  </span>


                  <h3>
                    {mealName ||
                      "Veggie Delight Box"}
                  </h3>


                  <div className="preview-price-row">

                    <strong>
                      ₹
                      {discountedPrice ||
                        "80"}
                    </strong>


                    {Number(originalPrice) >
                      Number(
                        discountedPrice
                      ) &&
                      Number(originalPrice) >
                        0 && (
                        <del>
                          ₹{originalPrice}
                        </del>
                      )}


                    {discountPercentage >
                      0 && (
                      <span>
                        {discountPercentage}%
                        OFF
                      </span>
                    )}

                  </div>

                </div>


                {/* DETAILS */}

                <div className="preview-meal-details">

                  {/* QUANTITY */}

                  <div>

                    <span>
                      ▣
                    </span>

                    <div>

                      <strong>
                        {quantity ||
                          "10"}{" "}
                        boxes available
                      </strong>

                      <small>
                        Fresh surplus food
                      </small>

                    </div>

                  </div>


                  {/* PICKUP */}

                  <div>

                    <span>
                      ◷
                    </span>

                    <div>

                      <strong>
                        {pickupTime}
                      </strong>

                      <small>
                        {pickupDate ||
                          "Select pickup date"}
                      </small>

                    </div>

                  </div>


                  {/* LOCATION */}

                  <div>

                    <span>
                      ⌖
                    </span>

                    <div>

                      <strong>
                        {restaurantName ||
                          "The Green Bowl"}
                      </strong>

                      <small>
                        {address ||
                          "Vadodara"}
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                TIPS
            ================================================= */}

            <section className="listing-tips-card">

              <div className="tips-heading">

                <span>
                  ✦
                </span>

                <h2>
                  Tips for a good listing
                </h2>

              </div>


              <ul>

                <li>

                  <span>
                    ✓
                  </span>

                  <p>
                    Add a clear and attractive
                    photo.
                  </p>

                </li>


                <li>

                  <span>
                    ✓
                  </span>

                  <p>
                    Mention accurate quantity
                    and pickup time.
                  </p>

                </li>


                <li>

                  <span>
                    ✓
                  </span>

                  <p>
                    Include key ingredients or
                    allergens.
                  </p>

                </li>


                <li>

                  <span>
                    ✓
                  </span>

                  <p>
                    Set a fair and affordable
                    price.
                  </p>

                </li>


                <li>

                  <span>
                    ✓
                  </span>

                  <p>
                    Make sure the food is safe
                    to consume.
                  </p>

                </li>

              </ul>

            </section>

          </aside>

        </form>

      </div>

    </main>
  );
}

export default CreateListing;