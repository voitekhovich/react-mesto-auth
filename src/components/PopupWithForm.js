import React from "react";
import Popup from "./Popup";

export default function PopupWithForm(props) {
  const {
    title,
    name,
    subTitle,
    children,
    isOpen,
    onClose,
    onSubmit,
    isValid,
  } = props;
  const formRef = React.useRef();

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="heading popup__heading">{title}</h2>
      <form
        className="form popup__form"
        ref={formRef}
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
    </Popup>
  );
}
