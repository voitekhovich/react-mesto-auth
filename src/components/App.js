import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Cards from './pages/Cards';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleLogin = (email, password) => {
    return auth.authorize(email, password).then((data) => {
      if (!data.token) return Promise.reject('No token');
      setLoggedIn(true);
      localStorage.setItem('jwt', data.token);
    });
  };

  const handleRegister = (email, password) => {
    return auth.register(email, password).then((data) => {
      history.push('/login');
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
    history.push('/login');
  }

  const tokenCheck = () => {
    if (!localStorage.getItem('jwt')) return;

    const token = localStorage.getItem('jwt');
    auth.getContent(token).then((data) => {
      setLoggedIn(true);
    });
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!loggedIn) return;
    history.push('/');
  }, [loggedIn]);

  return (
    <React.Fragment>
      <Switch>
        <Route path='/signin'>
          <Login onLogin={handleLogin} />
        </Route>

        <Route path='/signup'>
          <Register onRegister={handleRegister} />
        </Route>

        <ProtectedRoute path='/' loggedIn={loggedIn}>
          <Cards onSignOut={handleSignOut}/>
        </ProtectedRoute>
      </Switch>
    </React.Fragment>
  );
}
