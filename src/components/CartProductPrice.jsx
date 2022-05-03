import React from "react";

class CartProductPrice extends React.Component {
  render() {
    const currentAmount = this.props.count * this.props.pricesDetails.amount;
    return (
      <>
        <div>
          {this.props.pricesIndex === this.props.index ? (
            <h4
              className={
                this.props.display ? "current-price-modal" : "current-price"
              }
            >
              {this.props.pricesDetails.currency.symbol} {currentAmount}
            </h4>
          ) : null}
        </div>
      </>
    );
  }
}

export default CartProductPrice;
