
const express = require("express");
const mongoose = require("mongoose");

const Reservation = require("../models/Reservation");
const Meal = require("../models/Meal");
const User = require("../models/User");
const { protect, allowRoles } = require("../middleware/auth");

const router = express.Router();

const VALID_STATUSES = [
  "Pending",
  "Confirmed",
  "Picked Up",
  "Cancelled",
];

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ============================================
// GET DONOR RESERVATIONS
// GET /api/reservations/restaurant/:restaurantId
// Donors can view only their own reservations.
// ============================================
router.get(
  "/restaurant/:restaurantId",
  protect,
  allowRoles("food-lister"),
  async (req, res) => {
    try {
      const { restaurantId } = req.params;

      if (!isValidId(restaurantId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid restaurant ID.",
        });
      }

      if (restaurantId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You cannot access another donor's reservations.",
        });
      }

      const reservations = await Reservation.find({
        restaurantId: req.user.id,
      })
        .sort({ createdAt: -1 })
        .lean();

      return res.json({
        success: true,
        count: reservations.length,
        reservations,
      });
    } catch (error) {
      console.error("Get donor reservations:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to load reservations.",
      });
    }
  }
);

// ============================================
// GET CUSTOMER RESERVATIONS
// GET /api/reservations/customer/:customerId
// Customers can view only their own reservations.
// ============================================
router.get(
  "/customer/:customerId",
  protect,
  allowRoles("reserver"),
  async (req, res) => {
    try {
      const { customerId } = req.params;

      if (!isValidId(customerId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer ID.",
        });
      }

      if (customerId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You cannot access another customer's reservations.",
        });
      }

      const reservations = await Reservation.find({
        customerId: req.user.id,
      })
        .sort({ createdAt: -1 })
        .lean();

      return res.json({
        success: true,
        count: reservations.length,
        reservations,
      });
    } catch (error) {
      console.error("Get customer reservations:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to load customer reservations.",
      });
    }
  }
);

// ============================================
// CREATE RESERVATION
// POST /api/reservations
// Receivers can reserve meals only as themselves.
// ============================================
router.post(
  "/",
  protect,
  allowRoles("reserver"),
  async (req, res) => {
    const stockChanges = [];
    let reservationCreated = false;

    try {
      const {
        items,
        pickupAddress = "",
        pickupTime = "",
      } = req.body || {};

      const customer = await User.findById(req.user.id).select(
        "name email role"
      );

      if (!customer || customer.role !== "reserver") {
        return res.status(403).json({
          success: false,
          message: "A valid receiver account is required.",
        });
      }

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please add at least one meal.",
        });
      }

      const reservationItems = [];
      let restaurantId = null;
      let totalAmount = 0;

      for (const item of items) {
        const mealId = item?.mealId;
        const quantity = Number(item?.quantity);

        if (!isValidId(mealId)) {
          throw new Error("Invalid meal ID.");
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
          throw new Error(
            "Meal quantity must be a positive whole number."
          );
        }

        // Atomically reserve available stock.
        const meal = await Meal.findOneAndUpdate(
          {
            _id: mealId,
            available: true,
            quantity: { $gte: quantity },
          },
          {
            $inc: { quantity: -quantity },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        if (!meal) {
          throw new Error(
            "A meal is unavailable or there is insufficient stock."
          );
        }

        stockChanges.push({
          mealId: meal._id,
          quantity,
        });

        if (
          restaurantId &&
          String(restaurantId) !== String(meal.restaurantId)
        ) {
          throw new Error(
            "Please reserve meals from one donor at a time."
          );
        }

        restaurantId = meal.restaurantId;

        const price = Number(meal.price || 0);
        const oldPrice = Number(meal.oldPrice || 0);

        reservationItems.push({
          mealId: meal._id,
          title: meal.title,
          business: meal.business,
          image: meal.image || "",
          category: meal.category || "Other",
          address: meal.address || "",
          pickupTime: meal.pickupTime || "",
          price,
          oldPrice,
          quantity,
        });

        totalAmount += price * quantity;
      }

      // Update meal availability after reducing stock.
      for (const change of stockChanges) {
        const meal = await Meal.findById(change.mealId);

        if (meal) {
          meal.available = meal.quantity > 0;
          await meal.save();
        }
      }

      const mealAddresses = reservationItems
  .map((item) => item.address || item.pickupAddress || "")
  .map((address) => String(address).trim())
  .filter(Boolean);

const mealPickupTimes = reservationItems
  .map((item) => item.pickupTime || "")
  .map((time) => String(time).trim())
  .filter(Boolean);

const reservation = await Reservation.create({
  customerId: customer._id,
  customerName: customer.name,
  customerEmail: customer.email,
  restaurantId,
  items: reservationItems,
  totalAmount,
  pickupAddress:
    String(pickupAddress || "").trim() ||
    [...new Set(mealAddresses)].join(" / "),
  pickupTime:
    String(pickupTime || "").trim() ||
    [...new Set(mealPickupTimes)].join(" / "),
  status: "Pending",
});

      reservationCreated = true;

      return res.status(201).json({
        success: true,
        message: "Reservation created successfully.",
        reservation,
      });
    } catch (error) {
      console.error("Create reservation:", error.message);

      // Restore stock if reservation creation failed.
      if (!reservationCreated) {
        for (const change of [...stockChanges].reverse()) {
          try {
            await Meal.updateOne(
              { _id: change.mealId },
              { $inc: { quantity: change.quantity } }
            );

            const meal = await Meal.findById(change.mealId);

            if (meal) {
              meal.available = meal.quantity > 0;
              await meal.save();
            }
          } catch (rollbackError) {
            console.error(
              "Stock rollback failed:",
              rollbackError.message
            );
          }
        }
      }

      return res.status(400).json({
        success: false,
        message: error.message || "Unable to create reservation.",
      });
    }
  }
);

// ============================================
// UPDATE RESERVATION STATUS
// PATCH /api/reservations/:id/status
// Only the donor who owns the reservation can update it.
// ============================================
router.patch(
  "/:id/status",
  protect,
  allowRoles("food-lister"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body || {};

      if (!isValidId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid reservation ID.",
        });
      }

      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid reservation status.",
        });
      }

      const reservation = await Reservation.findById(id);

      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: "Reservation not found.",
        });
      }

      // Prevent a donor from changing another donor's reservation.
      if (String(reservation.restaurantId) !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You cannot update another donor's reservation.",
        });
      }

      if (reservation.status === "Cancelled") {
        return res.status(400).json({
          success: false,
          message: "Cancelled reservations cannot be changed.",
        });
      }

      if (
        reservation.status === "Picked Up" &&
        status !== "Picked Up"
      ) {
        return res.status(400).json({
          success: false,
          message: "Completed pickups cannot be reopened.",
        });
      }

      // Restore stock when a reservation is cancelled.
      if (
        status === "Cancelled" &&
        reservation.status !== "Cancelled"
      ) {
        for (const item of reservation.items) {
          const meal = await Meal.findById(item.mealId);

          if (!meal) continue;

          meal.quantity += Number(item.quantity || 0);
          meal.available = meal.quantity > 0;

          await meal.save();
        }
      }

      reservation.status = status;
      await reservation.save();

      return res.json({
        success: true,
        message: "Reservation status updated successfully.",
        reservation,
      });
    } catch (error) {
      console.error("Update reservation status:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to update reservation status.",
      });
    }
  }
);

module.exports = router;
