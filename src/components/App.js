import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Cards from "./pages/Cards";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as Auth from "../utils/Auth"

export default function App() {

  const [ loggedIn, setLoggedIn ] = useState(true);
  const history = useHistory();

  const handleLogin = (email, password) => {
    Auth.authorize(email, password)
      .then(data => {
        if (!data.jwt) return Promise.reject('No data');
        setLoggedIn(true);
      })
  }

  const handleRegister = (email, password) => {
    Auth.register(email, password)
      .then(()=> {
        history.push('/login');
      })
  }

  const tokenCheck = () => {
    if (!localStorage.getItem('jwt')) return;

    const jwt = localStorage.getItem('jwt');
    Auth.getContent(jwt)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        
      })
  }

  React.useEffect(()=>{
    tokenCheck();
  }, [])

  React.useEffect(()=>{
    history.push('/cards');
  }, [loggedIn])

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/signin">
          <Login onLogin={handleLogin}/>
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister}/>
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <Cards />
        </ProtectedRoute>
      </Switch>
    </React.Fragment>
  );
}
