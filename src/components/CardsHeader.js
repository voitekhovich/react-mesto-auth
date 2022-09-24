import React from "react";
import Header from "./Header";

export default function CardsHeader(props) {

  return (
    <Header>
      <li>{props.email}</li>
      <li>
        <button
          className="button navbar__button body__button-hover"
          type="button"
          onClick={props.onSignOut}
        >
          Выйти
        </button>
      </li>
    </Header>
  );
}
