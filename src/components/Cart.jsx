import React from "react";
import ReactDOM from "react-dom";
import "../css/cart.css";
import CartProductItem from "./CartProductItem";
import { Button, ModalWrapper, OverlayStyle, ModalStyle } from "./cartStyles";

class Cart extends React.Component {
  render() {
    if (!this.props.display) return null;
    return ReactDOM.createPortal(
      <OverlayStyle>
        <ModalWrapper>
          <ModalStyle>
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
                  attributeArray={this.props.attributeArray}
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
                {this.props.currencySymbol} {this.props.totalAmount.toFixed(2)}{" "}
              </h4>
            </div>

            <div className="cart-buttons">
              <Button onClick={this.props.showCartPage}>VIEW BAG</Button>
              <Button onClick={this.props.showCartPage}>CHECK OUT</Button>
              {/* <button>VIEW BAG</button>
          <button>CHECK OUT</button> */}
            </div>
          </ModalStyle>
        </ModalWrapper>
      </OverlayStyle>,
      document.getElementById("portal")
    );
  }
}

export default Cart;
