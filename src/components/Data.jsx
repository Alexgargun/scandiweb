import React from "react";
import ProductCard from "./ProductCard";

class Data extends React.Component {
  render() {
    const name = this.props.title;
    return (
      <div className="container">
        <h1 className="title">{name}</h1>
        <div className="card-wrapper" key={name}>
          <ProductCard
            title={this.props.title}
            showProductPage={this.props.showProductPage}
            order={this.props.order}
            // isActive={this.props.isActive}
            getProductId={this.props.getProductId}
            idx={this.props.id}
            // key={key}
            // index={key}
            // details={products[key]}
          />
        </div>
      </div>
    );
  }
}

export default Data;
