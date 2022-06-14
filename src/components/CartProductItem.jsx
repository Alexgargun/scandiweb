import React from "react";
import withHocs from "./queryHoc";
import CartProductPrice from "./CartProductPrice";
import Attributes from "./Attributes";
import { StyledCartButton } from "./attributesStyled";

class CartProductItem extends React.Component {
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
    //const { attributes = [] } = product;
    console.log(this.props.attributeArray);

    return (
      <div
        className={
          this.props.display ? "cart-page-item" : "cart-page-item-page"
        }
      >
        <div className="cart-page-left">
          <h2
            className={
              this.props.display
                ? "cart-product-title-modal"
                : "cart-product-title"
            }
          >
            {product.name}
          </h2>
          {Object.keys(prices).map((key) => {
            return (
              <CartProductPrice
                display={this.props.display}
                count={this.props.count}
                key={key}
                pricesIndex={key}
                index={this.props.index}
                pricesDetails={prices[key]}
              />
            );
          })}
          <div
            className={
              this.props.display
                ? "product-attributes-modal"
                : "product-attributes"
            }
          >
            {this.props.attributeArray.map((key) => {
              if (key.id === this.props.id)
                return Object.entries(key).map((item) => {
                  if (item[0] !== "id")
                    return (
                      <div key={item}>
                        <h3
                          className={
                            this.props.display
                              ? "attributes-modal"
                              : "attributes"
                          }
                        >
                          {item[0]}
                        </h3>
                        <div
                          className={
                            this.props.display
                              ? "attribute-item-modal"
                              : "attribute-item"
                          }
                          style={{ backgroundColor: `${item[1]}` }}
                        >
                          {item[1]}
                        </div>
                      </div>
                    );
                });
            })}
          </div>
        </div>
        <div className="cart-page-right">
          <div className="cart-page-buttons">
            <button
              className={
                this.props.display
                  ? "cart-page-button-modal"
                  : "cart-page-button"
              }
              onClick={() => this.props.addToOrder(this.props.id)}
            >
              +
            </button>
            <p
              className={
                this.props.display ? "cart-page-count-modal" : "cart-page-count"
              }
            >
              {this.props.count}
            </p>
            <button
              className={
                this.props.display
                  ? "cart-page-button-modal"
                  : "cart-page-button"
              }
              onClick={() => this.props.deleteFromOrder(this.props.id)}
            >
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
