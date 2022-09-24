import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Cards from "./pages/Cards";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import * as auth from "../utils/auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setUserEmail] = useState("");
  const history = useHistory();

  const handleLogin = (email, password) => {
    return auth.authorize(email, password).then((data) => {
      if (!data.token) return Promise.reject("No token");

      setLoggedIn(true);
      localStorage.setItem("jwt", data.token);
    });
  };

  const handleRegister = (email, password) => {
    return auth.register(email, password);
  };

  const handleSignOut = () => {
    console.log('ВЫПУСТИТЕ!');
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  };

  const tokenCheck = () => {
    if (!localStorage.getItem("jwt")) return;

    const token = localStorage.getItem("jwt");
    auth
      .getContent(token)
      .then((data) => {
        setLoggedIn(true);
        setUserEmail(data.data.email);
      })
      .catch((err) => {
        switch (err) {
          case 400:
            console.log(
              `${err} - Токен не передан или передан не в том формате`
            );
            break;
          case 401:
            console.log(`${err} - Переданный токен некорректен`);
            break;
          default:
            console.log(err);
        }
      });
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!loggedIn) return;
    history.push("/");
  }, [loggedIn]);

  return (
    <React.Fragment>
      <Switch>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <Cards
            onSignOut={handleSignOut}
            email={email}
            onTokenCheck={tokenCheck}
          />
        </ProtectedRoute>
      </Switch>
    </React.Fragment>
  );
}
