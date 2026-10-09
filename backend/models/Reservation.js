const mongoose = require("mongoose");

const reservationItemSchema = new mongoose.Schema(
  {
    mealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    business: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Other",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const reservationSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [reservationItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "A reservation must contain at least one meal.",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    pickupAddress: {
      type: String,
      default: "",
      trim: true,
    },
    pickupTime: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Picked Up", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

reservationSchema.index({ restaurantId: 1, createdAt: -1 });
reservationSchema.index({ customerId: 1, createdAt: -1 });

module.exports = mongoose.model("Reservation", reservationSchema);
