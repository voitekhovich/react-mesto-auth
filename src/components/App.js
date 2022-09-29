import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Cards from "./pages/Cards";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import {
  INFOTOOLTIP_MESSAGE_DEFAULT,
  INFOTOOLTIP_MESSAGE_OK,
  INFOTOOLTIP_MESSAGE_ERR,
} from "../utils/constants";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState(
    INFOTOOLTIP_MESSAGE_DEFAULT
  );

  const handleLogin = (email, password) => {
    return auth.authorize(email, password).then((data) => {
      if (!data.token) return Promise.reject("No token");

      setIsLoggedIn(true);
      localStorage.setItem("jwt", data.token);
    });
  };

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setIsRegistered(true);
        setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_OK);
      })
      .catch((err) => {
        setIsRegistered(false);
        setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_ERR);
        return Promise.reject(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail("");
    history.push("/signin");
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    auth
      .getContent(token)
      .then((data) => {
        setIsLoggedIn(true);
        setEmail(data.data.email);
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

  const handleInfoTooltipClose = () => {
    setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_DEFAULT);
    if (isRegistered) history.push("/login");
  };

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        handleInfoTooltipClose();
      }
    }
    if (!!infoTooltipMessage.icon) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [infoTooltipMessage.icon]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    history.push("/");
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <Switch>
        <Route path="/signin">
          <Login onLogin={handleLogin} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>

        <ProtectedRoute path="/" loggedIn={isLoggedIn}>
          <Cards
            onSignOut={handleSignOut}
            email={email}
            onTokenCheck={tokenCheck}
          />
        </ProtectedRoute>
      </Switch>
      {!!infoTooltipMessage.icon && (
        <InfoTooltip
          onClose={handleInfoTooltipClose}
          message={infoTooltipMessage}
        />
      )}
    </React.Fragment>
  );
}
