import React from "react";

class ProductPrice extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.id);
    this.props.getAmount(this.props.newAmount);
  };
  // amountValue = () => {
  //   this.props.getAmount(this.props.pricesDetails.amount);
  // };

  render() {
    return (
      <>
        <div>
          {this.props.pricesIndex === this.props.index ? (
            <h4 onClick={this.amountValue} className="current-price">
              {this.props.pricesDetails.currency.symbol}{" "}
              {this.props.pricesDetails.amount}
              <button onClick={this.handleClick}>Add to cart</button>
            </h4>
          ) : null}
        </div>
      </>
    );
    // {
    //   this.props.pricesIndex === this.props.index;
    // }
    // return <h3>{this.props.pricesDetails.amount}</h3>;
  }
}

export default ProductPrice;
