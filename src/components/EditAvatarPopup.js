import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Input from "./Input";

export default function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;
  const { values, isValid, errors, handleChange, resetForm } =
    useFormAndValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(values["avatar"]);
  };

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      subTitle={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        name="avatar"
        type="url"
        values={values}
        errors={errors}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        minLength="2"
        maxLength="200"
      />
    </PopupWithForm>
  );
}
