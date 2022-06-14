import React from "react";
import CartProductItem from "./CartProductItem";

class CartPage extends React.Component {
  render() {
    Object.keys(this.props.order).map((key) => {
      return console.log(this.props.order[key]);
    });
    //console.log(this.props.order);
    return (
      <section className="cart-page">
        <div className="container">
          <h2 className="subtitle">Cart</h2>
          <div className="cart-page-wrapper">
            {Object.keys(this.props.order).map((key) => {
              return (
                <CartProductItem
                  attributeArray={this.props.attributeArray}
                  display={this.props.display}
                  deleteFromOrder={this.props.deleteFromOrder}
                  addToOrder={this.props.addToOrder}
                  count={this.props.order[key]}
                  index={this.props.index}
                  id={key}
                  key={key}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default CartPage;
