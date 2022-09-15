import React from "react";

export default function ImagePopup(props) {

  const {card, onClose} = props;

  return (
    <div className={`popup popup_image ${card.link ? " popup_visible" : ''}`}>
      <div className="popup__container imagebox">
          <button className="button popup__close body__button-hover" type="button"
                  aria-label="Закрыть окно" onClick={onClose}></button>
          <figure className="imagebox__container" >
            <img className="imagebox__img" src={card.link} alt={card.name}/>
            <figcaption className="imagebox__caption">{card.name}</figcaption>
          </figure>
      </div>
    </div>
  )
}