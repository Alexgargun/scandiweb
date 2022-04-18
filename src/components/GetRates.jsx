import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CurrencyList from "./CurrencyList";

const getRates = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class GetRates extends React.Component {
  render() {
    return (
      <div
        className={`currency-switcher ${
          this.props.displaySwitcher ? "active" : ""
        }`}
      >
        <Query query={getRates}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Error :(</p>;
            return (
              <ul>
                {Object.keys(data.currencies).map((key) => {
                  return (
                    <CurrencyList
                      getSymbol={this.props.getSymbol}
                      currentCurrency={this.props.currentCurrency}
                      currencyDetails={data.currencies[key]}
                      id={key}
                      key={key}
                    />
                  );
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default GetRates;
