import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Data from "./Data";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Data} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
