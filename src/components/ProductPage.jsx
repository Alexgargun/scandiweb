import React from "react";

import ProductPrice from "./ProductPrice";
import withHocs from "./queryHoc";

class ProductPage extends React.Component {
  state = {
    mainImage: "",
  };

  // setMainImage = (key) => {
  //   console.log(key);
  //   //this.setState({ mainImage: key });
  // };

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

    console.log(product);

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
                {attributes.map(({ name, items, id }) => {
                  return (
                    <div className="attributes-wrapper" key={id}>
                      <h3 className="attributes">{name}:</h3>
                      <div className="product-attributes" key={items.id}>
                        {items.map(({ displayValue, id, value }) => {
                          return (
                            <div key={id} style={{ backgroundColor: value }}>
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
                {/* <button onClick={this.handleClick}>Add to cart</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withHocs(ProductPage);
