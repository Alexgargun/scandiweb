import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Data from "./Data";
//import CartProduct from "./CartProduct";
import GetRates from "./GetRates";
import Cart from "./Cart";
//import getRates from "./queryHoc";

const getRates = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

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

class App extends React.Component {
  state = {
    display: false,
    displayCurrencySwitcher: false,
    title: "",
    index: "0",
    currencySymbol: "$",
  };

  categorySwitch = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.innerText.toLowerCase() });
  };

  displayCart = (e) => {
    e.stopPropagation();
    const { display } = this.state;
    this.setState({ display: !display });
  };

  displaySwitcher = (e) => {
    e.stopPropagation();
    const { displayCurrencySwitcher } = this.state;
    this.setState({ displayCurrencySwitcher: !displayCurrencySwitcher });
  };

  turnOfModals = () => {
    this.setState({ displayCurrencySwitcher: false });
    this.setState({ display: false });
  };

  currentCurrency = (key) => {
    this.setState({ index: key });

    console.log(key);
  };

  getSymbol = (e) => {
    this.setState({ currencySymbol: e.target.innerText });
    console.log("click");
  };

  render() {
    return (
      <div onClick={this.turnOfModals} className="App">
        <header className="header ">
          <div className="container header-container">
            <nav className="menu">
              <Query query={getProducts}>
                {({ data, loading, error }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error) return <p>Error :(</p>;
                  return (
                    <ul className="menu-list">
                      {data.categories.map(({ name, products }) => (
                        <li
                          onClick={this.categorySwitch}
                          className="menu-link"
                          key={name}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  );
                }}
              </Query>
              {/* <ul className="menu-list">
                <li className="">women</li>
                <li className="menu-link">men</li>
                <li className="menu-link">kids</li>
              </ul> */}
            </nav>
            <div className="logo-wrapper">
              <div className="logo"></div>
            </div>
            <div className="menu-icons">
              <div onClick={this.displaySwitcher} className="currency">
                <p>
                  {this.state.currencySymbol ? this.state.currencySymbol : null}
                </p>
              </div>
              <GetRates
                getSymbol={this.getSymbol}
                currentCurrency={this.currentCurrency}
                displaySwitcher={this.state.displayCurrencySwitcher}
              />
              <div onClick={this.displayCart} className="empty-cart"></div>
              {this.state.display ? <Cart /> : null}
            </div>
          </div>
        </header>
        <main className={`main ${this.state.display ? "blur" : ""}`}>
          <Data id={this.state.index} title={this.state.title} />
        </main>
      </div>
    );
  }
}
export default App;
