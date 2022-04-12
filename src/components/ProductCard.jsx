import React from "react";

class ProductCard extends React.Component {
  render() {
    //const { name, id, description } =

    return (
      <div className="card">
        <div className="image">
          <img src={this.props.details.gallery} alt="" />
        </div>
        <div className="card-content">
          <h4 className="card-title">{this.props.details.name}</h4>
          <h4 className="card-price">{this.props.details.name}</h4>
        </div>
      </div>
    );
  }
}

export default ProductCard;
