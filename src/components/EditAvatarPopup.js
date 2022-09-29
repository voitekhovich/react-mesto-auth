import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

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
      <label className="form__field">
        <input
          className="form__input form__input_type_link"
          type="url"
          id="avatar-input"
          name="avatar"
          placeholder="Ссылка на картинку"
          value={values["avatar"] || ""}
          onChange={handleChange}
          required
        />
        <span className="form__input-error avatar-input-error">
          {errors["avatar"]}
        </span>
      </label>
    </PopupWithForm>
  );
}
