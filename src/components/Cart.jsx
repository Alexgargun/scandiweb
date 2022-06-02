import React from "react";
import ReactDOM from "react-dom";
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

const MODAL_STYLE = {
  position: "absolute",
  top: "90px",
  right: 0,
  backgroundColor: "#fff",
  zIndex: 1000,
  minWidth: "325px",
  padding: "8px 16px 20px 16px",
  overflow: "hidden",
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .4)",
};

const MODAL_WRAPPER = {
  maxWidth: "1200px",
  margin: "auto",
  position: "relative",
};
class Cart extends React.Component {
  render() {
    if (!this.props.display) return null;
    return ReactDOM.createPortal(
      <div style={OVERLAY_STYLE}>
        <div style={MODAL_WRAPPER}>
          <div style={MODAL_STYLE} className="cart-wrapper">
            <div className="cart-header">
              <h4 className="cart-title">
                My Bag,{" "}
                <span className="cart-title-semibold">
                  {this.props.itemsCount} items
                </span>{" "}
              </h4>
              <button
                onClick={this.props.closeCart}
                className="close-cart"
              ></button>
            </div>

            {Object.keys(this.props.order).map((key) => {
              return (
                <CartProductItem
                  deleteFromOrder={this.props.deleteFromOrder}
                  addToOrder={this.props.addToOrder}
                  display={this.props.display}
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
              <Button onClick={this.props.showCartPage}>VIEW BAG</Button>
              <Button onClick={this.props.showCartPage}>CHECK OUT</Button>
              {/* <button>VIEW BAG</button>
          <button>CHECK OUT</button> */}
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}

export default Cart;
