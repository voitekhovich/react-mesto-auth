import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Register(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(state.email, state.password).catch((err) => {
      console.log(err);
      setState((old) => ({
        ...old,
        errorMessage: err,
      }));
    });
  };

  return (
    <React.Fragment>
      <Header>
        <li>
          <Link className="menu__link" to={"/signin"}>
            Войти
          </Link>
        </li>
      </Header>
    <div className="sign">
      <h2 className="heading heading_theme_dark sign__heading">Регистрация</h2>
      <form className="form sign_form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset sign__fieldset">
          <input
            className="form__input form__input_type_name form__input_theme_dark"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={state.email || ""}
            onChange={handleChange}
          />

          <input
            className="form__input form__input_type_name form__input_theme_dark"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={state.password || ""}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="button form__submit form__submit_theme_dark sign__submit body__button-hover"
          >
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <div className="sign__subtitle">
        <p>
          Уже зарегистрированы?{" "}
          <span>
            <Link to="login">Войти</Link>
          </span>
        </p>
      </div>
    </div>
    </React.Fragment>
  );
}
