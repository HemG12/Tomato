import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../components/LoginPopup/LoginPopup";


const Cart = () => {
  const { cartItems, getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleCheckout = () => {
    if (!token) {
      setShowLogin(true); // show login popup
    } else {
      navigate("/order"); // go to checkout
    }
  };

  return (
    <div className="cart">
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="cart-items">
        {/* cart items mapping here */}
      </div>
      <div className="cart-bottom">
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
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
