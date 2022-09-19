import React from "react";
import { Route, Switch } from "react-router-dom";
import Cards from "./pages/Cards";
import Header from "./Header";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/">
          <SignUp />
        </Route>
        <Route path="/">
          <Cards />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
