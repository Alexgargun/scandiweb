import { gql } from "apollo-boost";

export const getRates = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
