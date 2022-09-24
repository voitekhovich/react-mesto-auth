export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._config = validationConfig;
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._buttonElement.setAttribute("disabled", "disabled");
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  enableSubmitButton() {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  resetValidation() {
    this.disableSubmitButton();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
