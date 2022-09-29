import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const { values, setValues, isValid, errors, handleChange } =
    useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values["name"],
      about: values["about"],
    });
  };

  React.useEffect(() => {
    if (isOpen) {
      setValues({
        ...values,
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      subTitle={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_name"
          type="text"
          id="name-input"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={values["name"] || ""}
          onChange={handleChange}
        />
        <span className="form__input-error name-input-error">
          {errors["name"]}
        </span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_about"
          type="text"
          id="about-input"
          name="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          value={values["about"] || ""}
          onChange={handleChange}
        />
        <span className="form__input-error about-input-error">
          {errors["about"]}
        </span>
      </label>
    </PopupWithForm>
  );
}
