export const token = "517ca562-c193-4fa0-98e3-f69b3e71bc2a";
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-47";
export const headers = {
  authorization: token,
  "Content-Type": "application/json",
};

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const userProfileSelectors = {
  userName: ".profile__name",
  userAbout: ".profile__about",
  userAvatart: ".profile__avatar",
};

export const formList = {
  editAvatarForm: "edit-form-avatar",
  addForm: "add-form",
  editForm: "edit-form",
};

export const elementTemplate = "#element-template";
export const elementsSelector = ".elements";

export const profileButtonEdit = document.querySelector(
  ".profile__edit-button"
);
export const profileButtonAdd = document.querySelector(".profile__add-button");
export const profileAvatarEdit = document.querySelector(
  ".profile__avatar-edit"
);

export const popupList = {
  popupEdit: ".popup_edit",
  popupAvatar: ".popup_avatar",
  popupImage: ".popup_image",
  popupAdd: ".popup_add",
  popupDel: ".popup_del",
};

export const INFOTOOLTIP_MESSAGE_DEFAULT = {
  icon: "",
  title: "",
};
export const INFOTOOLTIP_MESSAGE_OK = {
  icon: "info-tooltip_icon_ok",
  title: "Вы успешно зарегистрировались!",
};
export const INFOTOOLTIP_MESSAGE_ERR = {
  icon: "info-tooltip_icon_err",
  title: "Что-то пошло не так!\u000AПопробуйте ещё раз.",
};
