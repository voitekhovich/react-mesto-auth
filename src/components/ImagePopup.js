import React from "react";
import Popup from "./Popup";

export default function ImagePopup(props) {
  const { card, onClose, name, isOpen } = props;

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <figure className="imagebox__container">
        <img className="imagebox__img" src={card.link} alt={card.name} />
        <figcaption className="imagebox__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}
