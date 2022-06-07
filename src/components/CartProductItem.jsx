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
    const { attributes = [] } = product;
    console.log(this.props.count);
    console.log(data);

    return (
      <div className="cart-page-item">
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
            {attributes.map(({ items, id, name, type }) => {
              if (type === "text")
                return (
                  <Attributes key={id} items={items} name={name} type={type} />
                );
            })}
            {/* {attributes.map(({ items }) => {
              return items.map(({ displayValue, id, value }) => {
                return (
                  <div style={{ backgroundColor: value }} key={id}>
                    {displayValue}
                  </div>
                );
              });
            })} */}
          </div>
        </div>
        <div className="cart-page-right">
          <div className="cart-page-buttons">
            <StyledCartButton
              onClick={() => this.props.addToOrder(this.props.id)}
            >
              +
            </StyledCartButton>
            <p>{this.props.count}</p>
            <StyledCartButton
              onClick={() => this.props.deleteFromOrder(this.props.id)}
            >
              -
            </StyledCartButton>
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
