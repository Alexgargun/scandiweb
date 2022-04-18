import React from "react";
import CurrentPriceCurrency from "./CurrentPriceCurrency";

class ProductCard extends React.Component {
  render() {
    const { prices } = this.props.details;

    return (
      <div className="card">
        <div className="image">
          <img src={this.props.details.gallery} alt="" />
        </div>
        <div className="card-content">
          <h4 className="card-title">{this.props.details.name}</h4>
          {Object.keys(this.props.details.prices).map((key) => {
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
