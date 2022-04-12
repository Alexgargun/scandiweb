import React from "react";

class Cart extends React.Component {
  render() {
    return (
      <div className="cart-wrapper">
        <h5 className="cart-title">My Bag, 2 items</h5>
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
