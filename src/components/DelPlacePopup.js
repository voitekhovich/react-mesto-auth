import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DelPlacePopup(props) {
  const { isOpen, onClose, onDelPlace } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onDelPlace();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="del"
      subTitle="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
