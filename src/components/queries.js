import { gql } from "apollo-boost";

export const getRates = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORIGY = gql`
  query ($filter: String!) {
    category(input: { title: $filter }) {
      products {
        id
        name
        inStock
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
        description
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      brand
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;

export const GET_CURRENCY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CAREGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
