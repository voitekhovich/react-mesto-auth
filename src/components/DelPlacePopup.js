import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DelPlacePopup(props) {
  const { isOpen, onClose, onDelPlace, isLoading } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onDelPlace();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="del"
      subTitle={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      isValid={true}
      onSubmit={handleSubmit}
    />
  );
}
