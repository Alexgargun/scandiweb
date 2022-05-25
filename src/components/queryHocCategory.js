import { graphql } from "react-apollo";
import { GET_PRODUCTS_BY_CATEGORIGY } from "./queries";

const withGraphQl = graphql(GET_PRODUCTS_BY_CATEGORIGY, {
  options: ({ filter = "" }) => ({
    variables: { filter },
  }),
});

export default withGraphQl;
