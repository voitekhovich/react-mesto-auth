import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Input from "./Input";

export default function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const { values, isValid, errors, handleChange, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values["name"],
      link: values["link"],
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      subTitle={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        name="name"
        values={values}
        errors={errors}
        onChange={handleChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
      />

      <Input
        name="link"
        values={values}
        errors={errors}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        type="url"
      />
    </PopupWithForm>
  );
}
