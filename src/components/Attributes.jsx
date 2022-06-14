import React from "react";
import { StyledTextAttribute } from "./attributesStyled";

class Attributes extends React.Component {
  render() {
    const { items, name, id, display } = this.props;
    console.log(display);

    return (
      <div
        className={
          display ? "attributes-wrapper-cart-modal" : "attributes-wrapper-cart"
        }
        key={id}
      >
        <h3 className={display ? "attributes-modal" : "attributes"}>{name}:</h3>
        {items.map(({ displayValue, id, value }) => {
          return (
            <div
              className="attribute-item"
              key={id}
              style={{ backgroundColor: value }}
            >
              {displayValue}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Attributes;
