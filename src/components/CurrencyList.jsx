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
        </span>{" "}
        {this.props.currencyDetails.label}
      </li>
    );
  }
}

export default CurrencyList;
