import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {

  const {isOpen, onClose, onUpdateUser} = props;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [validator, setValidator] = React.useState({});

  const currentUser = React.useContext(CurrentUserContext);

  const handleNameChange = (evt) => {
    setName(evt.target.value)
  }

  const handleAboutChange = (evt) => {
    setDescription(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    })
  }

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      validator.resetValidation();
    }
  }, [isOpen]);

  return (
    <PopupWithForm title="Редактировать профиль" name="edit" subTitle="Сохранить"
                   isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
                   validator={validator} setValidator={setValidator}>
        <label className="form__field">
          <input className="form__input form__input_type_name" type="text" id="name-input"
                name="name" placeholder="Имя" minLength="2" maxLength="40" required value={name || ''}
                onChange={handleNameChange}/>
          <span className="form__input-error name-input-error"></span>
        </label>
        <label className="form__field">
          <input className="form__input form__input_type_about" type="text" id="about-input"
                name="about" placeholder="О себе" minLength="2" maxLength="200" required value={description || ''}
                onChange={handleAboutChange} />
          <span className="form__input-error about-input-error"></span>
        </label>
      </PopupWithForm>
  )

}
