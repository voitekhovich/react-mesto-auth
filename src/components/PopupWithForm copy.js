import React from "react";

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
              disabled={!isValid}
            >
              {subTitle}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
