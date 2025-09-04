import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const url = "http://localhost:4000";
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`${url}/api/order/status/${orderId}`, { status });
      if (response.data.success) {
        fetchOrders(); // refresh list
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2>Orders Management</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Items</th>
            <th>Total</th>
            <th>Delivery Info</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.userId}</td>
              <td>
                {order.items.map((i, idx) => (
                  <div key={idx}>
                    {i.name} x {i.quantity}
                  </div>
                ))}
              </td>
              <td>₹{order.amount}</td>
              <td>
                {order.deliveryInfo?.firstName} {order.deliveryInfo?.lastName} <br />
                {order.deliveryInfo?.street}, {order.deliveryInfo?.city}
              </td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
