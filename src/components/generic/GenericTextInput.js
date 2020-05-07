import React from "react";

export default function GenericTextInput({
  error,
  lable,
  onChange,
  name,
  value,
  onFocus,
  disabled,
  maxLength,
}) {
  function handleChange(event) {
    var alphaNumeric = /^[0-9a-zA-Z]+$/;
    var isNumber = /^[0-9]+$/;
    if (name === "zipCode") {
      if (event.target.value.match(alphaNumeric) || event.target.value === "") {
        onChange(event);
      }
    } else if (name === "phoneNumber") {
      if (event.target.value.match(isNumber) || event.target.value === "") {
        onChange(event);
      }
    } else {
      onChange(event);
    }
  }

  return (
    <div className="generic-text-input">
      <div className="lable">{lable}</div>
      <input
        onChange={handleChange}
        name={name}
        value={value}
        className="text-input"
        onFocus={onFocus}
        disabled={disabled}
        maxLength={maxLength}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
