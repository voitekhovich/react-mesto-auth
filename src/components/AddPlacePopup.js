import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

  const {isOpen, onClose, onAddPlace} = props

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [validator, setValidator] = React.useState({});

  function handleNameChange(evt) {
    setName(evt.target.value);
  }


  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    })
  }

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
      validator.resetValidation();
    }
    
  }, [isOpen]);

  return (
    <PopupWithForm title="Новое место" name="add" subTitle="Создать" isOpen={isOpen} onClose={onClose}
                   onSubmit={handleSubmit} validator={validator} setValidator={setValidator}>
      <label className="form__field">
        <input className="form__input form__input_type_title" type="text" id="title-input"
              name="name" placeholder="Название" minLength="2" maxLength="30" required
              value={name || ''} onChange={handleNameChange} />
        <span className="form__input-error title-input-error"></span>
      </label>
      <label className="form__field">
        <input className="form__input form__input_type_link" type="url" id="link-input"
              name="link" placeholder="Ссылка на картинку" required value={link || ''}
              onChange={handleLinkChange} />
        <span className="form__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}