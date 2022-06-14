import React from "react";
import { Query } from "react-apollo";
import Data from "./Data";
import GetRates from "./GetRates";
import Cart from "./Cart";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import { getProducts } from "./queries";

class App extends React.Component {
  state = {
    displayCategoryPage: true,
    displayProductPage: false,
    displayCartPage: false,
    display: false,
    displayCurrencySwitcher: false,
    title: "all",
    index: "0",
    currencySymbol: "$",
    id: "ps-5",
    order: {},
    prices: {},
    attribute: {
      id: "",
      color: "",
      capacity: "",
      "With USB 3 ports": "",
      "Touch ID in keyboard": "",
      size: "",
    },
    attributeArray: [],
  };

  getAttribute = (value, displayValue, name, id) => {
    const attribute = { ...this.state.attribute };
    if (id !== attribute.id) {
      for (let key in attribute) {
        delete attribute[key];
      }
    }
    if (name === "Color") {
      attribute.color = displayValue;
    }
    if (name === "Size") {
      attribute.size = value;
    }
    if (name === "Capacity") {
      attribute.capacity = value;
    }
    if (name === "With USB 3 ports") {
      attribute["With USB 3 ports"] = value;
    }
    if (name === "Touch ID in keyboard") {
      attribute["Touch ID in keyboard"] = value;
    }
    attribute.id = id;
    this.setState({ attribute: attribute });
  };

  pushAttribute = () => {
    const attribute = { ...this.state.attribute };
    this.setState({
      ...this.state.attributeArray.push(attribute),
    });

    this.setState({ attribute: attribute });
  };

  closeCart = () => {
    this.setState({ display: false });
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
    this.setState({ display: false });
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
  };

  addAttribute = () => {
    const { attribute } = this.state;
    const { attributeArray } = this.state;
    attributeArray.push(attribute);
    this.setState({ attributeArray: attributeArray });
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

  displayCart = () => {
    this.setState({ display: true });
    this.setState({ displayCurrencySwitcher: false });
  };

  displaySwitcher = (e) => {
    e.stopPropagation();
    const { displayCurrencySwitcher } = this.state;
    this.setState({ displayCurrencySwitcher: !displayCurrencySwitcher });
  };

  turnOfModals = () => {
    this.setState({ displayCurrencySwitcher: false });
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
    const attributeArray = [...this.state.attributeArray];

    const itemsCount = orderArray.reduce((prev, key) => prev + key, 0);

    return (
      <div onClick={this.turnOfModals} className="App">
        <header className="header ">
          <div className="container header-container">
            <nav className="menu">
              <Query query={getProducts}>
                {({ data, loading, error }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error) return <p>Error : </p>;
                  return (
                    <ul onClick={this.showCategoryPage} className="menu-list">
                      {data.categories.map(({ name }) => (
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
                <span className="empty-cart-counter">{itemsCount}</span>
              </div>
              <Cart
                attributeArray={this.state.attributeArray}
                closeCart={this.closeCart}
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
            </div>
          </div>
        </header>
        <main className="main">
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
              pushAttribute={this.pushAttribute}
              addAttribute={this.addAttribute}
              getAttribute={this.getAttribute}
              getAmount={this.getAmount}
              addToOrder={this.addToOrder}
              index={this.state.index}
              id={this.state.id}
            />
          ) : null}
          {this.state.displayCartPage ? (
            <CartPage
              attributeArray={this.state.attributeArray}
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
