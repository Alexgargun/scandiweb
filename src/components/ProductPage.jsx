import React from "react";
import ProductPrice from "./ProductPrice";
import withHocs from "./queryHoc";

class ProductPage extends React.Component {
  // handleClick = () => {
  //   this.props.addToOrder(this.props.id);
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
    const newAmount = prices.map((key) => {
      return key;
    });
    // const currentAmount = Object.keys(newAmount).map((key) => {
    //   return key;
    // });
    // if (key === this.props.index) {
    //   console.log(newAmount[key]);
    // }
    console.log(newAmount[this.props.index]);
    return (
      <section className="product-page">
        <div className="container">
          <div className="product-page-wrapper">
            <div className="product-aside">
              {gallery.map((key) => {
                return (
                  <div key={key} className="product-aside-image">
                    <img src={key} alt="" />
                  </div>
                );
              })}
            </div>
            <div className="product-container">
              <div className="product-container-image">
                <img src={product.gallery} alt="" />
              </div>
              <div className="product-data">
                <h3 className="name">
                  {product.name} <span></span>{" "}
                </h3>
                {attributes.map(({ name, items }) => {
                  return (
                    <>
                      <h3 className="attributes" key={name}>
                        {name}:
                      </h3>
                      <div className="product-attributes" key={items.id}>
                        {items.map(({ displayValue }) => {
                          return <div key={displayValue}>{displayValue}</div>;
                        })}
                      </div>
                    </>
                  );
                })}
                <h3>Price:</h3>

                {Object.keys(prices).map((key) => {
                  return (
                    <ProductPrice
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
