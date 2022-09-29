import React from "react";

export default function Form({
  title,
  name,
  children,
  isValid,
  subTitle,
  onSubmit,
}) {
  return (
    <React.Fragment>
      <h2 className="heading popup__heading">{title}</h2>
      <form
        className="form popup__form"
        name={`${name}-form`}
        onSubmit={onSubmit}
        noValidate
      >
        <fieldset className="form__fieldset">
          {children}
          <button
            className="button form__submit body__button-hover"
            type="submit"
            disabled={!isValid}
          >
            {subTitle}
          </button>
        </fieldset>
      </form>
    </React.Fragment>
  );
}
