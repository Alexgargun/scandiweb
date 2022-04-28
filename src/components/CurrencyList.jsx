import React from "react";

class CurrencyList extends React.Component {
  handleClick = () => {
    this.props.currentCurrency(this.props.id);
  };
  render() {
    return (
      <li onClick={this.handleClick}>
        <span onClick={this.props.getSymbol}>
          {this.props.currencyDetails.symbol}
          {this.props.currencyDetails.label}
        </span>{" "}
      </li>
    );
  }
}

export default CurrencyList;
