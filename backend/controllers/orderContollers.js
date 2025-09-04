import orderModel from "../models/orderModae.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
    });

    await newOrder.save();

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error placing order" });
  }
};
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// ✅ Update order status (for admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating order status" });
  }
};