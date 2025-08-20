import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required."],
      unique: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number."],
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values, but unique if a value is present
      match: [
        /.+\@.+\..+/,
        "Please enter a valid email address if you provide one.",
      ],
    },
    password: {
      type: String,
      select: false, // Hide password by default
    },
    avatarUrl: {
      type: String,
    },
    // We can add fields for email verification if needed
    // emailVerified: { type: Date },
    otp: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
    cart: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true },
        // You can add other item details here if needed, like an image URL
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
