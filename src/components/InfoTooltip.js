import React from "react";
import Popup from "./Popup";

export default function InfoTooltip(props) {
  const { onClose, message } = props;

  return (
    <Popup isOpen={!!message.icon} name="infotooltip" onClose={onClose}>
      <div className="infotooltip__container">
        <div className={`infotooltip__icon ${message.icon}`}></div>
        <p className="infotooltip__description">{message.title}</p>
      </div>
    </Popup>
  );
}
