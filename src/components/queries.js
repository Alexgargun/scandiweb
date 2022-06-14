import { gql } from "apollo-boost";

export const getProducts = gql`
  {
    categories {
      name
    }
  }
`;

export const getRates = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
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
  query product($id: String!) {
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
      products {
        id
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
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;
