import React from "react";
import "../css/cart.css";
import CartProductItem from "./CartProductItem";
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  font-size: 1em;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  margin: 1em;
  padding: 1em 2em;
  border-radius: 3px;
  display: block;
  transition: all 0.3s ease;
  background: #fff;
  border: 1px solid #1d1f22;
`;
class Cart extends React.Component {
  render() {
    return (
      <div className="cart-wrapper">
        <h4 className="cart-title">
          My Bag,{" "}
          <span className="cart-title-semibold">{this.props.count} items</span>{" "}
        </h4>
        {Object.keys(this.props.order).map((key) => {
          return (
            <CartProductItem
              count={this.props.order[key]}
              index={this.props.index}
              id={key}
              key={key}
            />
          );
        })}
        <div className="cart-total-amount">
          <h4 className="cart-title-semibold">Total</h4>
          <h4 className="cart-title">
            {" "}
            {this.props.currencySymbol} {this.props.totalAmount}{" "}
          </h4>
        </div>

        <div className="cart-buttons">
          <Button>VIEW BAG</Button>
          <Button>CHECK OUT</Button>
          {/* <button>VIEW BAG</button>
          <button>CHECK OUT</button> */}
        </div>
      </div>
    );
  }
}

export default Cart;
