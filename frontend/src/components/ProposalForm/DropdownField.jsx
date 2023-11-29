import React, {useState} from "react";
import "./DropdownField.css"; 

/**
 * 
 * @param {*} data array of {id: number, name: string}
 * @param {*} placeholder insert a placeholder string text, that is displyed when no option is selected
 * @returns 
 */
const DropdownField = ({ data, placeholder, onValueChange, initialValue }) => {
  const [placeholderActive, setPlaceholderActive] = useState(true);

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    onValueChange(selectedValue);
  };

  return (
    <div className="dropdown-select">
      <label htmlFor="types" className="block">Select the type</label>
      <select id="types" className="select-style" onChange={handleDropdownChange}>
        {(placeholderActive) ? <option value="">{placeholder}</option> : null}
        {data.map((value) => (
          <option key={value.id} value={value.name} selected={initialValue===value.name}>{value.name}</option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
