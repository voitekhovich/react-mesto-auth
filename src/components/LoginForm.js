import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import Header from "./Header";
import Loader from "./Loader";

export default function LoginForm(props) {

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const {values, handleChange } = useForm({});

  const sendErrorMessage = (mesg) => {
    setError(mesg);
    console.log(mesg);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    props
      .onSubmit(values['email'], values['password'])
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
              value={values['email'] || ""}
              onChange={handleChange}
            />

            <input
              className="form__input form__input_type_name form__input_theme_dark"
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              value={values['password'] || ""}
              onChange={handleChange}
            />
            <span className="form__input-error sign__input-error">
              {error}
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
