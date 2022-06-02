import React from "react";
import withHocs from "./queryHoc";
import CartProductPrice from "./CartProductPrice";
//import styled from 'styled-components'

// const Button = styled.button`
//   /* Adapt the colors based on primary prop */
//   background: ${props => props.d ? "palevioletred" : "white"};
//   color: ${props => props.primary ? "white" : "palevioletred"};

//   font-size: 30px;
//   border: 1px solid #1D1F22;
//   height: ${this.props.display ? "24" : "45px"}; ;
//   width: 45px;
// `;

// const StyledCounter = styled.div`
// padding: 20px 0px;
// border-top: 1px solid #E5E5E5;
// display: flex;
// justify-content: space-between;
// `;

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
