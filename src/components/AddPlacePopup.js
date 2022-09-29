import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;

  const {values, isValid, errors, handleChange, resetForm} = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values['name'],
      link: values['link'],
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
      subTitle={isLoading? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_title"
          type="text"
          id="title-input"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values['name'] || ""}
          onChange={handleChange}
        />
        <span className="form__input-error title-input-error">{errors['name']}</span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_link"
          type="url"
          id="link-input"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={values['link'] || ""}
          onChange={handleChange}
        />
        <span className="form__input-error link-input-error">{errors['link']}</span>
      </label>
    </PopupWithForm>
  );
}
