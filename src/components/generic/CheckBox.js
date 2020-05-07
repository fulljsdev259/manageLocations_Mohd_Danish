import React from "react";

export default function CheckBox({ checked, onClick }) {
  return (
    <div onClick={onClick} className="generic-checkbox-wrapper">
      {checked && <i className="fa fa-check" />}
    </div>
  );
}
