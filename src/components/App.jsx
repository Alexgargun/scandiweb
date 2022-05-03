import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Data from "./Data";
import Router from "./Router";
import GetRates from "./GetRates";
import Cart from "./Cart";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

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
    displayCategoryPage: true,
    displayProductPage: false,
    displayCartPage: false,
    display: false,
    displayCurrencySwitcher: false,
    title: "",
    index: "0",
    currencySymbol: "$",
    id: "ps-5",
    order: {},
    prices: {},
  };

  showProductPage = () => {
    this.setState({ displayCategoryPage: false });
    this.setState({ displayCartPage: false });
    this.setState({ displayProductPage: true });
  };
  showCartPage = () => {
    this.setState({ displayCategoryPage: false });
    this.setState({ displayCartPage: true });
    this.setState({ displayProductPage: false });
  };
  showCategoryPage = () => {
    this.setState({ displayCategoryPage: true });
    this.setState({ displayCartPage: false });
    this.setState({ displayProductPage: false });
  };

  getAmount = (key) => {
    const prices = { ...this.state.prices };
    prices[key] = prices[key] + 1 || 1;
    this.setState({ prices: prices });
    console.log(prices);
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order: order });
  };
  deleteFromOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] - 1 || null;
    if (order[key] === null) {
      delete order[key];
    }
    this.setState({ order: order });
  };

  getProductId = (key) => {
    this.setState({ id: key });
  };

  categorySwitch = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.innerText.toLowerCase() });
  };

  displayCart = (e) => {
    e.stopPropagation();
    const { display } = this.state;
    this.setState({ display: !display });
    console.log(display);
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
    this.setState({ currencySymbol: e.target.innerText[0] });
    console.log("click");
  };

  render() {
    const order = { ...this.state.order };
    const prices = { ...this.state.prices };

    let orderArray = Object.keys(order).map((key) => {
      return order[key];
    });

    const pricesArray = [];
    for (let key in prices) {
      pricesArray.push(key.split(",")[this.state.index]);
    }

    let totalAmount = 0;
    for (let i = 0; i < pricesArray.length; i++) {
      totalAmount += pricesArray[i] * orderArray[i];
    }

    const itemsCount = orderArray.reduce((prev, key) => prev + key, 0);

    const { currencySymbol } = this.state;

    console.log(currencySymbol[0]);

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
                    <ul onClick={this.showCategoryPage} className="menu-list">
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
            </nav>
            <div className="logo-wrapper">
              <div onClick={this.showCategoryPage} className="logo"></div>
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
              <div onClick={this.displayCart} className="empty-cart">
                <spsn className="empty-cart-counter">{itemsCount}</spsn>
              </div>

              {this.state.display ? (
                <Cart
                  deleteFromOrder={this.deleteFromOrder}
                  showCartPage={this.showCartPage}
                  itemsCount={itemsCount}
                  addToOrder={this.addToOrder}
                  display={this.state.display}
                  currencySymbol={this.state.currencySymbol}
                  totalAmount={totalAmount}
                  prices={this.state.prices}
                  order={this.state.order}
                  index={this.state.index}
                />
              ) : null}
            </div>
          </div>
        </header>
        <main className={`main ${this.state.display ? "blur" : ""}`}>
          {this.state.displayCategoryPage ? (
            <Data
              showProductPage={this.showProductPage}
              order={this.state.order}
              getProductId={this.getProductId}
              id={this.state.index}
              title={this.state.title}
            />
          ) : null}
          {this.state.displayProductPage ? (
            <ProductPage
              getAmount={this.getAmount}
              addToOrder={this.addToOrder}
              index={this.state.index}
              id={this.state.id}
            />
          ) : null}
          {this.state.displayCartPage ? (
            <CartPage
              display={this.state.display}
              deleteFromOrder={this.deleteFromOrder}
              addToOrder={this.addToOrder}
              index={this.state.index}
              order={this.state.order}
            />
          ) : null}
        </main>
      </div>
    );
  }
}
export default App;
