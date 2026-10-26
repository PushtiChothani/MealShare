
const mongoose = require("mongoose");

/**
 * User schema supporting both standard password authentication and Google OAuth.
 * Roles: 'food-lister' (restaurants/donors) and 'reserver' (customers/volunteers).
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 8,
      select: false,
    },

    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },

    avatar: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["food-lister", "reserver"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
