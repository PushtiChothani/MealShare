const STORAGE_KEY = "mealshare_listings";

const defaultListings = [
  {
    id: "green-bowl",
    name: "The Green Bowl",
    description: "Fresh healthy meals from today's surplus.",
    category: "Healthy Meal",
    mealsLeft: 8,
    price: 50,
    pickupDate: "",
    pickupTime: "6:00 PM – 8:00 PM",
    bestBefore: "",
    restaurantName: "The Green Bowl",
    address: "Alkapuri",
    city: "Vadodara",
    position: [22.3078, 73.1815],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
  },

  {
    id: "bake-affairs",
    name: "Bake Affairs",
    description: "Fresh cakes and pastries from today's surplus.",
    category: "Bakery",
    mealsLeft: 12,
    price: 40,
    pickupDate: "",
    pickupTime: "4:00 PM – 7:00 PM",
    bestBefore: "",
    restaurantName: "Bake Affairs",
    address: "Fatehgunj",
    city: "Vadodara",
    position: [22.315, 73.175],
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85",
  },

  {
    id: "spice-stories",
    name: "Spice Stories",
    description: "Freshly prepared local meals ready for rescue.",
    category: "Indian",
    mealsLeft: 6,
    price: 45,
    pickupDate: "",
    pickupTime: "5:00 PM – 7:00 PM",
    bestBefore: "",
    restaurantName: "Spice Stories",
    address: "Sayajigunj",
    city: "Vadodara",
    position: [22.298, 73.192],
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=85",
  },

  {
    id: "healthy-bites",
    name: "Healthy Bites",
    description: "Nutritious meals prepared with fresh ingredients.",
    category: "Healthy Meal",
    mealsLeft: 10,
    price: 55,
    pickupDate: "",
    pickupTime: "12:00 PM – 2:00 PM",
    bestBefore: "",
    restaurantName: "Healthy Bites",
    address: "Vasna",
    city: "Vadodara",
    position: [22.302, 73.168],
    image:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=700&q=85",
  },

  {
    id: "daily-kitchen",
    name: "Daily Kitchen",
    description: "Wholesome home-style meals available nearby.",
    category: "Indian",
    mealsLeft: 9,
    price: 45,
    pickupDate: "",
    pickupTime: "7:00 PM – 8:30 PM",
    bestBefore: "",
    restaurantName: "Daily Kitchen",
    address: "Karelibaug",
    city: "Vadodara",
    position: [22.32, 73.188],
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85",
  },
];


function notifyListingsChanged() {
  window.dispatchEvent(
    new CustomEvent("mealshare:listings-updated")
  );
}


export function getListings() {
  try {
    const savedListings = localStorage.getItem(
      STORAGE_KEY
    );

    if (!savedListings) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultListings)
      );

      return defaultListings;
    }

    const parsedListings = JSON.parse(savedListings);

    if (!Array.isArray(parsedListings)) {
      return defaultListings;
    }

    return parsedListings;

  } catch (error) {
    console.error(
      "Unable to load MealShare listings:",
      error
    );

    return defaultListings;
  }
}


export function saveListings(listings) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(listings)
  );

  notifyListingsChanged();
}


export function addListing(listing) {
  const existingListings = getListings();

  const updatedListings = [
    ...existingListings,
    listing,
  ];

  saveListings(updatedListings);

  return listing;
}


export function updateListing(updatedListing) {
  const existingListings = getListings();

  const updatedListings = existingListings.map(
    (listing) =>
      listing.id === updatedListing.id
        ? updatedListing
        : listing
  );

  saveListings(updatedListings);

  return updatedListing;
}


export function saveListing(listing) {
  if (listing.id) {
    const existingListings = getListings();

    const alreadyExists = existingListings.some(
      (item) => item.id === listing.id
    );

    if (alreadyExists) {
      return updateListing(listing);
    }
  }

  return addListing(listing);
}