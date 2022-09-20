import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Cards from "./pages/Cards";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn} component={Cards} />
      </Switch>
    </React.Fragment>
  );
}
