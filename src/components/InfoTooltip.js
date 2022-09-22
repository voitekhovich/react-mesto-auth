import React from "react";

export default function InfoTooltip(props) {
  const { card, onClose } = props;

  const tooltip = {
    ok: {
      style: "info-tooltip_icon_ok",
      description: "Вы успешно зарегистрировались!",
    },
    err: {
      style: "info-tooltip_icon_err",
      description: "Что-то пошло не так! Попробуйте ещё раз.",
    },
  };

  return (
    <div className={`popup ${card.link ? " popup_visible" : ""}`}>
      <div className="popup__container popup_info-tooltip">
        <button
          className="button popup__close body__button-hover"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <div className="info-tooltip_container">
          <div className={`info-tooltip_icon ${tooltip.ok.style}`}></div>
          <p className="info-tooltip_description">{tooltip.ok.description}</p>
        </div>
      </div>
    </div>
  );
}
