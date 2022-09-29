import React from "react";

export default function Input(props) {
  const { name, values, errors } = props;

  return (
    <label className="form__field">
      <input
        {...props}
        required
        value={values[name] || ""}
        className={`form__input form__input_type_${name}`}
      />
      <span className="form__input-error">{errors[name]}</span>
    </label>
  );
}
