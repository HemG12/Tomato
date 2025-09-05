import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({ setShowLogin }) => {
  const { cartItems, food_list, getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const url = "http://localhost:4000"; // change to live URL in production

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const deliveryFee = 2;

  const items = food_list
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      foodId: item._id,
      name: item.name,
      quantity: cartItems[item._id],
      price: item.price,
    }));

  const totalAmount = getTotalCartAmount() + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // 🔒 Check login first
    if (!token) {
      setShowLogin(true); // open login popup
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          items,
          amount: totalAmount,
          deliveryInfo: formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // attach token
        }
      );

      if (response.data.success) {
        alert("✅ Order placed successfully!");
        navigate("/"); // go home
      } else {
        alert("❌ Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("⚠️ Please login again");
      setShowLogin(true);
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
        </div>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="state" placeholder="State" onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="number" name="zip" placeholder="Zip code" onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" onChange={handleChange} />
        </div>
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub-Total</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{totalAmount}</b>
            </div>
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
