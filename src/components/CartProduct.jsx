import React from "react";

// function createMarkup({ description }) {
//   console.log(description);
//   return { __html: "First &middot; Second" };
// }

class CartProduct extends React.Component {
  render() {
    const { description } = this.props;
    return <div dangerouslySetInnerHTML={{ __html: description }} />;
  }
}

export default CartProduct;
