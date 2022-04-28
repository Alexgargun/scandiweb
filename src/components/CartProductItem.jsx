import React from "react";
import withHocs from "./queryHoc";
import CartProductPrice from "./CartProductPrice";
//import Attributes from "./Attributes";

class CartProductItem extends React.Component {
  // handleClickAdd = () => {
  //   this.props.newaddToOrder(this.props.id);
  // };
  handleClick = () => {
    console.log("click");
  };
  handleSearch = () => {
    const { data } = this.props;
    const { id } = this.props.id;

    data.fetchMore({
      variables: { id },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    });
  };

  render() {
    const { data = {} } = this.props;
    const { product = {} } = data;
    const { gallery = [] } = product;
    const { prices = [] } = product;
    const { attributes = [] } = product;
    console.log(prices);
    console.log(product);
    return (
      <div className="cart-page-item">
        <div className="cart-page-left">
          <h2 className="cart-product-title">{product.name}</h2>
          {Object.keys(prices).map((key) => {
            return (
              <CartProductPrice
                count={this.props.count}
                key={key}
                pricesIndex={key}
                index={this.props.index}
                pricesDetails={prices[key]}
              />
            );
          })}
          <div className="product-attributes">
            {attributes.map(({ items }) => {
              return items.map(({ displayValue, id, value }) => {
                return (
                  <div style={{ backgroundColor: value }} key={displayValue}>
                    {displayValue}
                  </div>
                );
              });
            })}
          </div>
        </div>
        <div className="cart-page-right">
          <div className="cart-page-buttons">
            <button onClick={() => this.props.addToOrder(this.props.id)}>
              +
            </button>
            <p>{this.props.count}</p>
            <button onClick={() => this.props.deleteFromOrder(this.props.id)}>
              -
            </button>
          </div>
          <div className="cart-page-image">
            <img src={gallery} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default withHocs(CartProductItem);
