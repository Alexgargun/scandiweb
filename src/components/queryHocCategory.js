import { graphql } from "react-apollo";
import { GET_PRODUCTS_BY_CATEGORY } from "./queries";

const withGraphQl = graphql(GET_PRODUCTS_BY_CATEGORY, {
  options: ({ filter = "" }) => ({
    variables: { filter },
  }),
});

export default withGraphQl;
