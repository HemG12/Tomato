import express from "express";
import { placeOrder, listOrders, updateOrderStatus } from "../controllers/orderContollers.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);        // user places order
orderRouter.get("/list", listOrders);          // admin fetch orders
orderRouter.put("/status/:orderId", updateOrderStatus); // admin updates status

export default orderRouter;
