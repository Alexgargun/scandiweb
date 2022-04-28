import { graphql } from "react-apollo";
import { GET_PRODUCT_BY_ID } from "./queries";

const withGraphQl = graphql(GET_PRODUCT_BY_ID, {
  options: ({ id = "" }) => ({
    variables: { id },
  }),
});

export default withGraphQl;
