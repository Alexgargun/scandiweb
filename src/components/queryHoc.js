import { graphql } from "react-apollo";
import { compose } from "recompose";
import { getRates } from "./queries";

export default compose(graphql(getRates));
