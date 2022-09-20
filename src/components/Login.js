import React from "react";

export default function Login() {
  const { email, setEmail } = React.useState("");
  const { password, setPassword } = React.useState("");

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <div className="sign">
      <h2 className="heading heading_theme_dark sign__heading">Вход</h2>
      <form className="form sign_form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset sign__fieldset">
          <input
            className="form__input form__input_type_name form__input_theme_dark"
            id="email-input"
            name="email-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />

          <input
            className="form__input form__input_type_name form__input_theme_dark"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
          />

          <button
            type="submit"
            className="button form__submit form__submit_theme_dark sign__submit body__button-hover"
          >
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}
