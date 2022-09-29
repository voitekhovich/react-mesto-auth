import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm";

export default function Register(props) {
  const { onRegister } = props;

  const handleSubmit = (email, password) => {
    return onRegister(email, password).catch((err) => {
      let errMessage = "";
      switch (err) {
        case 400:
          errMessage = `${err} - некорректно заполнено одно из полей`;
          break;
        default:
          errMessage = err;
      }
      return Promise.reject(errMessage);
    });
  };

  return (
    <LoginForm
      formTitle="Регистрация"
      btnSubmitTitle="Зарегистрироваться"
      headerLinkTo="/signin"
      headerLinkTitle="Войти"
      onSubmit={handleSubmit}
    >
      <div className="sign__subtitle">
        <p>
          Уже зарегистрированы?{" "}
          <span>
            <Link to="login">Войти</Link>
          </span>
        </p>
      </div>
    </LoginForm>
  );
}
