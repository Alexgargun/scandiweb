import React from "react";
import CurrentPriceCurrency from "./CurrentPriceCurrency";
import { Query } from "react-apollo";
import { GET_PRODUCTS_BY_CATEGORY } from "./queries";

class ProductCard extends React.Component {
  render() {
    const filter = this.props.title;
    return (
      <Query query={GET_PRODUCTS_BY_CATEGORY} variables={{ filter }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error! ${error}`;
          const { products } = data.category;
          console.log(products);
          return products.map((el) => {
            return (
              <div
                key={el.id}
                onClick={() => this.props.getProductId(el.id)}
                className="card"
              >
                <div onClick={this.props.showProductPage} className="image">
                  <img src={el.gallery} alt="" />
                </div>
                {Object.keys(this.props.order).map((item) => {
                  return item === products.id ? (
                    <div className="card-bucket">
                      <div className=""></div>
                    </div>
                  ) : null;
                })}
                <div className="card-content">
                  <h4 className="card-title">{el.name}</h4>
                  {Object.keys(el.prices).map((key) => {
                    return (
                      <CurrentPriceCurrency
                        idx={this.props.idx}
                        id={key}
                        key={key}
                        pricesDetails={el.prices[key]}
                        className="card-price"
                      />
                    );
                  })}
                </div>
              </div>
            );
          });
        }}
      </Query>
    );
  }

  // render() {
  //   const { prices } = this.props.details;

  //   return (
  //     <div onClick={this.handleProductIdClick} className="card">
  //       <div onClick={this.props.showProductPage} className="image">
  //         <img src={this.props.details.gallery} alt="" />
  //       </div>
  //       {Object.keys(this.props.order).map((item) => {
  //         return item === this.props.details.id ? (
  //           <div className="card-bucket">
  //             <div className=""></div>
  //           </div>
  //         ) : null;
  //       })}
  //       <div className="card-content">
  //         <h4 className="card-title">{this.props.details.name}</h4>
  //         {Object.keys(prices).map((key) => {
  //           return (
  //             <CurrentPriceCurrency
  //               idx={this.props.idx}
  //               id={key}
  //               key={key}
  //               pricesDetails={this.props.details.prices[key]}
  //               className="card-price"
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }
}

export default ProductCard;
