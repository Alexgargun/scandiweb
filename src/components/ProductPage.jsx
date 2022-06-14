import React from "react";
import CartProduct from "./CartProduct";

import ProductPrice from "./ProductPrice";
import withHocs from "./queryHoc";

class ProductPage extends React.Component {
  state = {
    mainImage: "",
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
    const { description } = product;
    console.log(description);

    const newAmount = prices.map(({ amount }) => {
      return amount;
    });

    return (
      <section className="product-page">
        <div className="container">
          <div className="product-page-wrapper">
            <div className="product-aside">
              {gallery.map((key) => {
                return (
                  <div key={key} className="product-aside-image">
                    <img
                      onClick={() => this.setState({ mainImage: key })}
                      src={key}
                      alt="product-pic"
                    />
                  </div>
                );
              })}
            </div>
            <div className="product-container">
              <div className="product-container-image">
                <img src={this.state.mainImage || gallery} alt="" />
              </div>
              <div className="product-data">
                <h3 className="name">
                  {product.name} <span></span>{" "}
                </h3>
                {attributes.map(({ name, items, id, type }) => {
                  return (
                    <div className="attributes-wrapper" key={id}>
                      <h3 className="attributes">{name}:</h3>
                      <div className="product-attributes" key={items.id}>
                        {items.map(({ displayValue, id, value }) => {
                          return (
                            <div
                              className="product-attributes-product-page"
                              key={id}
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                this.props.getAttribute(
                                  value,
                                  displayValue,
                                  name,
                                  (id = this.props.id)
                                )
                              }
                            >
                              {displayValue}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <h3>Price:</h3>

                {Object.keys(prices).map((key) => {
                  return (
                    <ProductPrice
                      addAttribute={this.props.addAttribute}
                      newAmount={newAmount}
                      addToOrder={this.props.addToOrder}
                      id={this.props.id}
                      getAmount={this.props.getAmount}
                      key={key}
                      pricesIndex={key}
                      index={this.props.index}
                      pricesDetails={prices[key]}
                    />
                  );
                })}
                <CartProduct description={description} />

                {/* <button onClick={this.props.pushAttribute}>
                  Add to cart 2
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withHocs(ProductPage);
