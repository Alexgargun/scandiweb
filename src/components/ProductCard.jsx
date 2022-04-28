import React from "react";
import CurrentPriceCurrency from "./CurrentPriceCurrency";

class ProductCard extends React.Component {
  handleProductIdClick = () => {
    this.props.getProductId(this.props.details.id);
  };
  render() {
    const { prices } = this.props.details;

    return (
      <div onClick={this.handleProductIdClick} className="card">
        <div className="image">
          <img src={this.props.details.gallery} alt="" />
        </div>
        {Object.keys(this.props.order).map((item) => {
          return item === this.props.details.id ? (
            <div className="card-bucket">
              <div className=""></div>
            </div>
          ) : null;
        })}
        <div className="card-content">
          <h4 className="card-title">{this.props.details.name}</h4>
          {Object.keys(prices).map((key) => {
            return (
              <CurrentPriceCurrency
                idx={this.props.idx}
                id={key}
                key={key}
                pricesDetails={this.props.details.prices[key]}
                className="card-price"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductCard;
