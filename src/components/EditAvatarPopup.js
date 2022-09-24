import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const [validator, setValidator] = React.useState({});
  const avatarInputRef = React.useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarInputRef.current.value);
  };

  React.useEffect(() => {
    if (isOpen) {
      avatarInputRef.current.value = "";
      validator.resetValidation();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      subTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validator={validator}
      setValidator={setValidator}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_link"
          type="url"
          id="avatar-input"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarInputRef}
        />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
