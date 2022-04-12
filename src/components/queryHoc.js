import { graphql } from "react-apollo";

import { getRates } from "./queries";

export default graphql(getRates);
