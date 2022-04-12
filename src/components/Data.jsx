import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ProductCard from "./ProductCard";
const getProducts = gql`
  {
    categories {
      name
      products {
        name
        inStock
        description
        gallery
        brand
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

class Data extends React.Component {
  render() {
    return (
      <Query query={getProducts}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Error :(</p>;
          console.log(data);
          let result = data.categories.filter((element) => {
            return element.name === "all";
          });
          console.log(result);
          return (
            <div className="container">
              {data.categories
                .filter((item) => {
                  return (
                    item.name ===
                    `${this.props.title ? this.props.title : "all"}`
                  );
                })
                .map(({ name, products }) => (
                  <>
                    <h2 className="title">{name}</h2>
                    <div className="card-wrapper" key={name}>
                      {/* <button onClick={(e) => console.log(e.target)}>
                        {name}
                      </button> */}
                      {Object.keys(products).map((key) => {
                        return (
                          <ProductCard
                            key={key}
                            index={key}
                            details={products[key]}
                          />
                        );
                      })}
                    </div>
                  </>
                ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

// const Data = () => (
//   <Query query={getProducts}>
//     {({ data, loading, error }) => {
//       if (loading) return <p>Loading…</p>;
//       if (error) return <p>Error :(</p>;
//       return data.rates.map(({ currency, rate }) => (
//         <div key={currency}>
//           <p>{`${currency}: ${rate}`}</p>
//         </div>
//       ));
//     }}
//   </Query>
// );

export default Data;