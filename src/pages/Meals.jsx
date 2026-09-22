import "../styles/Meals.css";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import MealCard from "../components/MealCard";
import CartModal from "../components/CartModal";

const sampleMeals = [
  {
    id: 1,
    image: "/image/meal1.png",
    category: "Full Meals",
    name: "Superfood Salad & Grain Bowl",
    description: "Fresh vegetables, grains & healthy toppings",
    rating: "4.8",
    reviews: "120+",
    provider: "The Green Bowl",
    distance: "2.4 km",
    quantity: "14 bowls",
    stock: 14,
    price: 50,
    originalPrice: 160,
  },
  {
    id: 2,
    image: "/image/meal2.png",
    category: "Beverages",
    name: "Cold Pressed Mango & Citrus Juice",
    description: "100% natural, refreshing cold-pressed fruit juice",
    rating: "4.9",
    reviews: "85+",
    provider: "Healthy Bites",
    distance: "1.8 km",
    quantity: "8 bottles",
    stock: 8,
    price: 30,
    originalPrice: 90,
  },
  {
    id: 3,
    image: "/image/meal3.png",
    category: "Bakery",
    name: "Chocolate Muffin",
    description: "Rich chocolate muffin baked fresh daily",
    rating: "4.7",
    reviews: "94+",
    provider: "Bake House",
    distance: "3.1 km",
    quantity: "6 pieces",
    stock: 6,
    price: 35,
    originalPrice: 70,
  },
  {
    id: 4,
    image: "/image/meal4.png",
    category: "Full Meals",
    name: "Paneer Rice Bowl",
    description: "Spiced paneer tikka served with aromatic basmati rice",
    rating: "4.6",
    reviews: "150+",
    provider: "Fresh Kitchen",
    distance: "1.2 km",
    quantity: "10 bowls",
    stock: 10,
    price: 80,
    originalPrice: 150,
  },
  {
    id: 5,
    image: "/image/meal5.png",
    category: "Snacks",
    name: "Veg Sandwich",
    description: "Crunchy vegetables with mint chutney in grilled bread",
    rating: "4.5",
    reviews: "62+",
    provider: "Daily Bites",
    distance: "0.9 km",
    quantity: "5 sandwiches",
    stock: 5,
    price: 45,
    originalPrice: 90,
  },
  {
    id: 6,
    image: "/image/meal6.png",
    category: "Desserts",
    name: "Fresh Cream Cupcake",
    description: "Soft vanilla cupcake topped with whipped fresh cream",
    rating: "4.9",
    reviews: "110+",
    provider: "Sweet Crumbs",
    distance: "2.7 km",
    quantity: "12 cupcakes",
    stock: 12,
    price: 40,
    originalPrice: 80,
  },
  {
    id: 7,
    image: "/image/meal1.png",
    category: "Full Meals",
    name: "Nutritious Veggie Thali",
    description: "Complete balanced meal with roti, sabzi, dal & rice",
    rating: "4.7",
    reviews: "135+",
    provider: "Annapurna Rasoi",
    distance: "3.5 km",
    quantity: "7 thalis",
    stock: 7,
    price: 75,
    originalPrice: 150,
  },
  {
    id: 8,
    image: "/image/meal3.png",
    category: "Bakery",
    name: "Artisan Sourdough Bread",
    description: "Crusty sourdough loaf baked with organic whole wheat",
    rating: "4.8",
    reviews: "88+",
    provider: "Artisan Oven",
    distance: "4.2 km",
    quantity: "4 loaves",
    stock: 4,
    price: 60,
    originalPrice: 120,
  },
  {
    id: 9,
    image: "/image/meal2.png",
    category: "Beverages",
    name: "Fresh Orange & Mint Juice",
    description: "Freshly squeezed vitamin C boost juice",
    rating: "4.9",
    reviews: "95+",
    provider: "Juice Corner",
    distance: "2.1 km",
    quantity: "10 bottles",
    stock: 10,
    price: 35,
    originalPrice: 75,
  },
  {
    id: 10,
    image: "/image/meal5.png",
    category: "Fruits & Vegetables",
    name: "Organic Salad Basket",
    description: "Farm-fresh cucumber, tomatoes, lettuce & bell peppers",
    rating: "4.8",
    reviews: "54+",
    provider: "Farm Fresh Organics",
    distance: "1.5 km",
    quantity: "9 baskets",
    stock: 9,
    price: 55,
    originalPrice: 110,
  },
  {
    id: 11,
    image: "/image/meal5.png",
    category: "Fruits & Vegetables",
    name: "Exotic Berry & Fruit Box",
    description: "Seasonal apple, banana, grapes and berry assortment",
    rating: "4.9",
    reviews: "78+",
    provider: "Green Grocers",
    distance: "2.9 km",
    quantity: "6 boxes",
    stock: 6,
    price: 70,
    originalPrice: 140,
  },
  {
    id: 12,
    image: "/image/meal5.png",
    category: "Snacks",
    name: "Crispy Potato Bites",
    description: "Golden fried potato bites with tang dip",
    rating: "4.4",
    reviews: "45+",
    provider: "Quick Snack Shack",
    distance: "1.1 km",
    quantity: "11 portions",
    stock: 11,
    price: 30,
    originalPrice: 60,
  },
];

function Meals() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [distance, setDistance] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // CART STATE
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dynamic Category Counts
  const categoryCounts = {
    All: sampleMeals.length,
    "Full Meals": sampleMeals.filter((m) => m.category === "Full Meals").length,
    Bakery: sampleMeals.filter((m) => m.category === "Bakery").length,
    Beverages: sampleMeals.filter((m) => m.category === "Beverages").length,
    Snacks: sampleMeals.filter((m) => m.category === "Snacks").length,
    "Fruits & Vegetables": sampleMeals.filter((m) => m.category === "Fruits & Vegetables").length,
    Desserts: sampleMeals.filter((m) => m.category === "Desserts").length,
  };

  // Filter Meals logic
  const filteredMeals = sampleMeals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "All" ? true : meal.category === selectedCategory;

    const matchesSearch =
      !searchTerm ||
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase());

    const mealDist = parseFloat(meal.distance);
    const matchesDistance = isNaN(mealDist) || mealDist <= distance;

    return matchesCategory && matchesSearch && matchesDistance;
  });

  // CART HANDLERS WITH STRICT SURPLUS STOCK LIMITS
  const handleAddToCart = (meal) => {
    const maxStock = meal.stock || parseInt(meal.quantity) || 10;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === meal.id);
      if (existing) {
        if ((existing.cartQuantity || 1) >= maxStock) {
          // Stock limit reached for this surplus meal
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === meal.id
            ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...meal, stock: maxStock, cartQuantity: 1 }];
    });
  };

  const handleUpdateQuantity = (mealId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(mealId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === mealId) {
          const maxStock = item.stock || parseInt(item.quantity) || 10;
          const cappedQty = Math.min(newQuantity, maxStock);
          return { ...item, cartQuantity: cappedQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (mealId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== mealId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + (item.cartQuantity || 1),
    0
  );

  const cartTotalAmount = cartItems.reduce((sum, item) => {
    const numPrice = typeof item.price === "number"
      ? item.price
      : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return sum + numPrice * (item.cartQuantity || 1);
  }, 0);

  const handleReset = () => {
    setSelectedCategory("All");
    setDistance(10);
    setSearchTerm("");
  };

  return (
    <div className="meals-page">
      {/* =========================
          DOODLE HERO SECTION
      ========================= */}
      <div className="meals-doodle-wrapper">
        <img
          src="/image/doodles.png"
          alt=""
          className="meals-doodle-background"
        />

        <div className="meals-content">
          <div className="meals-badge">
            <span className="badge-icon">🌱</span>
            <span>SURPLUS FOOD RESCUE • VADODARA</span>
          </div>

          <h1>Find Meals Near You</h1>

          <p className="meals-description">
            Discover and reserve available surplus food nearby from local
            bakeries, kitchens, and grocers before it goes to waste.
            Delicious meals at up to 70% off.
          </p>

          <div className="meals-info">
            <div className="info-pill">
              <span>📍</span>
              <span>Vadodara City</span>
            </div>

            <div className="info-pill">
              <span>🛍️</span>
              <span>{sampleMeals.length}+ Surplus Meals Available</span>
            </div>

            <div className="info-pill">
              <span>🏷️</span>
              <span>Avg. 65% Savings</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          FILTER BAR
      ========================= */}
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        distance={distance}
        setDistance={setDistance}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryCounts={categoryCounts}
        filteredCount={filteredMeals.length}
        onReset={handleReset}
        cartItemCount={cartItemCount}
        cartTotalAmount={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* =========================
          MEAL CARDS GRID SECTION
      ========================= */}
      <section className="meals-grid-section">
        {filteredMeals.length > 0 ? (
          <div className="meals-grid">
            {filteredMeals.map((meal) => {
              const inCartItem = cartItems.find((item) => item.id === meal.id);
              const cartQuantity = inCartItem ? inCartItem.cartQuantity : 0;

              return (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  cartQuantity={cartQuantity}
                  onAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        ) : (
          <div className="no-meals-found">
            <h3>No surplus meals found</h3>
            <p>
              We couldn't find any surplus meals matching your filters within{" "}
              <strong>{distance} km</strong>
              {selectedCategory !== "All" && (
                <> for <strong>{selectedCategory}</strong></>
              )}
              .
            </p>
            <button className="reset-button" type="button" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* =========================
          CART SLIDE-OVER MODAL
      ========================= */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default Meals;