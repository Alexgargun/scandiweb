import React from "react";
import {
  StyledTextAttribute,
  StyledTextAttributeWrapper,
} from "./attributesStyled";

class Attributes extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <StyledTextAttributeWrapper>
        {items.map(({ displayValue, id, value }) => {
          return (
            <StyledTextAttribute key={id}>{displayValue}</StyledTextAttribute>
          );
        })}
      </StyledTextAttributeWrapper>
    );
  }
}

export default Attributes;
