import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";

export default function LoginForm(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const sendErrorMessage = (mesg) => {
    setMessage(mesg);
    console.log(mesg);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    props
      .onSubmit(state.email, state.password)
      .catch((err) => {
        sendErrorMessage(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <React.Fragment>
      <Header>
        <li>
          <Link className="navbar__link body__button-hover" to={props.headerLinkTo}>
            {props.headerLinkTitle}
          </Link>
        </li>
      </Header>

      <div className="sign">
        <h2 className="heading heading_theme_dark sign__heading">
          {props.formTitle}
        </h2>
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
            <span className="form__input-error sign__input-error">
              {message}
            </span>
            {isLoading && (
              <div className="page__loader">
                <Loader />
              </div>
            )}
            <button
              type="submit"
              className="button form__submit form__submit_theme_dark sign__submit body__button-hover"
            >
              {props.btnSubmitTitle}
            </button>
          </fieldset>
        </form>
        {props.children}
      </div>
    </React.Fragment>
  );
}
