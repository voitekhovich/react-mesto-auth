import React from "react";
import Form from "./Form";
import Popup from "./Popup";

export default function PopupWithForm(props) {
  const {
    title,
    name,
    subTitle,
    children,
    isOpen,
    onClose,
    onSubmit,
    isValid,
  } = props;

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <Form
        title={title}
        name={name}
        isValid={isValid}
        subTitle={subTitle}
        onSubmit={onSubmit}
      >
        {children}
      </Form>
    </Popup>
  );
}
