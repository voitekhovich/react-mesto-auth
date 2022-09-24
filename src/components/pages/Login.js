import React from "react";
import LoginForm from "../LoginForm";

export default function Login(props) {

  const handleSubmit = (email, password) => {
    return props.onLogin(email, password)
      .catch((err) => {
        switch (err) {
          case 400:
            return Promise.reject(`${err} - не передано одно из полей`);
          case 401:
            return Promise.reject(`${err} - пользователь с email не найден`);
          default:
            return Promise.reject(err);
        }
      })
  };

  return (
    <LoginForm
      formTitle="Вход"
      btnSubmitTitle="Войти"
      headerLinkTo="/signup"
      headerLinkTitle="Регистрация"
      onSubmit={handleSubmit}
    />
  );
}
