import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // link to User model (if you have one)
    required: true,
  },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      name: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "preparing", "out-for-delivery", "delivered", "cancelled"],
    default: "pending",
  },
  deliveryInfo: {
  firstName: String,
  lastName: String,
  email: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  phone: String,
},

  date: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
