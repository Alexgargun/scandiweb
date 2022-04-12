import React from "react";

class CartProduct extends React.Component {
  render() {
    return (
      <div className="cart-product-wrapper">
        <div className="cart-product-describe">
          <h5 className="cart-product-title">My Bag, 2 items</h5>
          <h6>Apollo Running Short</h6>
        </div>

        <div className="cart-product-image">
          <button>VIEW BAG</button>
          <button>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

export default CartProduct;
