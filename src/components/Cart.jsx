import React from "react";
import "../css/cart.css";
class Cart extends React.Component {
  render() {
    return (
      <div className="cart-wrapper">
        <h5 className="cart-title">
          My Bag, <span>2 items</span>{" "}
        </h5>
        <h6>Apollo Running Short</h6>
        <div className="cart-buttons">
          <button>VIEW BAG</button>
          <button>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default Cart;
