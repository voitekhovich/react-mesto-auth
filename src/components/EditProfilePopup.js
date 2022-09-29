import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Input from "./Input";

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
      <Input
        name="name"
        values={values}
        errors={errors}
        onChange={handleChange}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />

      <Input
        name="about"
        values={values}
        errors={errors}
        onChange={handleChange}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      
      {/* <Input
        name="name"
        values={values["name"] || ""}
        errors={errors["name"]}
        handleChange={handleChange}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />

      <Input
        name="about"
        values={values["about"] || ""}
        errors={errors["about"]}
        handleChange={handleChange}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
      /> */}
    </PopupWithForm>
  );
}
