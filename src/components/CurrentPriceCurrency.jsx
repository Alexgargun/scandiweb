import React from "react";

class CurrentPriceCurrency extends React.Component {
  render() {
    const { amount, currency } = this.props.pricesDetails;
    return this.props.id === this.props.idx ? (
      <>
        <p>
          {currency.symbol} {amount}
        </p>
      </>
    ) : null;
  }
}

export default CurrentPriceCurrency;
