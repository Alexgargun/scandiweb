import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Data from "./Data";
import CartProduct from "./CartProduct";
import GetRates from "./GetRates";
//import queryHoc from "./queryHoc";

// const getRates = gql`
//   {
//     currencies {
//       label
//       symbol
//     }
//   }
// `;

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
  };

  categorySwitch = (e) => {
    e.preventDefault();
    const { title } = this.state;
    this.setState({ title: e.target.innerText.toLowerCase() });
    console.log(title);
  };

  displayCart = () => {
    const { display } = this.state;
    this.setState({ display: !display });
  };

  displaySwitcher = () => {
    const { displayCurrencySwitcher } = this.state;
    this.setState({ displayCurrencySwitcher: !displayCurrencySwitcher });
  };
  render() {
    return (
      <div className="App">
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
                <p>$</p>
              </div>
              {this.state.displayCurrencySwitcher ? <GetRates /> : null}
              <div onClick={this.displayCart} className="empty-cart"></div>
              {this.state.display ? (
                <div className="cart-wrapper">
                  <h5 className="cart-title">My Bag, 2 items</h5>
                  <h6>Apollo Running Short</h6>
                  <div className="cart-buttons">
                    <button>VIEW BAG</button>
                    <button>CHECK OUT</button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <main className="main">
          <Data title={this.state.title} />
        </main>
      </div>
    );
  }
}
export default App;
