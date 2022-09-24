import React from "react";
import { Link, useHistory } from "react-router-dom";
import InfoTooltip from "../InfoTooltip";
import {
  INFOTOOLTIP_MESSAGE_DEFAULT,
  INFOTOOLTIP_MESSAGE_OK,
  INFOTOOLTIP_MESSAGE_ERR,
} from "../../utils/constants";
import LoginForm from "../LoginForm";

export default function Register(props) {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState(
    INFOTOOLTIP_MESSAGE_DEFAULT
  );
  const history = useHistory();

  const handleSubmit = (email, password) => {
    return props
      .onRegister(email, password)
      .then(() => {
        setIsRegistered(true);
        setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_OK);
      })
      .catch((err) => {
        let errMessage = "";
        switch (err) {
          case 400:
            errMessage = `${err} - некорректно заполнено одно из полей`;
            break;

          default:
            errMessage = err;
        }
        setIsRegistered(false);
        setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_ERR);
        return Promise.reject(errMessage);
      });
  };

  const handleInfoTooltipClose = () => {
    setInfoTooltipMessage(INFOTOOLTIP_MESSAGE_DEFAULT);
    if (isRegistered) history.push("/login");
  };

  return (
    <LoginForm
      formTitle="Регистрация"
      btnSubmitTitle="Зарегистрироваться"
      headerLinkTo="/signin"
      headerLinkTitle="Войти"
      onSubmit={handleSubmit}
    >
      <div className="sign__subtitle">
        <p>
          Уже зарегистрированы?{" "}
          <span>
            <Link to="login">Войти</Link>
          </span>
        </p>
      </div>
      {!!infoTooltipMessage.icon && (
        <InfoTooltip
          onClose={handleInfoTooltipClose}
          message={infoTooltipMessage}
        />
      )}
    </LoginForm>
  );
}
