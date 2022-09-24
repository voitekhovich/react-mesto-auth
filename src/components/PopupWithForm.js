import React from "react";
import { validationConfig } from "../utils/constants";
import FormValidator from "../utils/FormValidator";

export default function PopupWithForm(props) {
  const {
    title,
    name,
    subTitle,
    children,
    isOpen,
    onClose,
    onSubmit,
    validator,
    setValidator,
  } = props;
  const formRef = React.useRef();

  const setValidation = () => {
    const validator = new FormValidator(validationConfig, formRef.current);
    validator.enableValidation();
    setValidator(validator);
  };

  React.useEffect(() => {
    if (validator) setValidation();
  }, []);

  return (
    <div className={`popup popup_${name}${isOpen ? " popup_visible" : ""}`}>
      <div className="popup__container">
        <button
          className="button popup__close body__button-hover"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
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
            >
              {subTitle}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
