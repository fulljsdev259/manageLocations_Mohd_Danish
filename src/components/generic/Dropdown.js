import React, { useState, useRef, useEffect } from "react";
import GenericTextInput from "./GenericTextInput";

export default function Dropdown({ selectedState, onClick, data }) {
  const [isDropdown, setDropdown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
    }
  }

  return (
    <ul ref={ref}>
      <li className="select-state" onClick={() => setDropdown(!isDropdown)}>
        <GenericTextInput
          lable={"State"}
          name="states"
          disabled={true}
          onFocus={() => setDropdown(!isDropdown)}
          value={selectedState}
        />
        <ul className={`dropdown ${isDropdown ? "show" : "hide"}`}>
          {data.map((list, index) => (
            <li
              key={`${index}`}
              onClick={() => onClick(list)}
              className="state-item"
            >
              {list}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
