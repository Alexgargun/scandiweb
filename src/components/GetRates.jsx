import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const getRates = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class GetRates extends React.Component {
  state = {
    display1: false,
  };
  render() {
    return (
      <div className="currency-switcher">
        <Query query={getRates}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Error :(</p>;
            console.log(data.currencies);
            return data.currencies.map(({ label, symbol }) => (
              <p key={label}>{`${symbol} ${label}`}</p>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default GetRates;
