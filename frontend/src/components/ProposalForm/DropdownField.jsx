import React, {useState} from "react";
import "./DropdownField.css"; 

/**
 * 
 * @param {*} data array of {id: number, name: string}
 * @param {*} placeholder insert a placeholder string text, that is displyed when no option is selected
 * @returns 
 */
const DropdownField = ({children, data, placeholder}) => {
    const [placeholderActive, setPlaceholderActive] = useState(true);

  return (
    <div className="dropdown-select">
        <label htmlFor="label" className="block">Select the type</label>
        <select id="types" className="select-style" placeholder="Select the proposal type...">
            {(placeholderActive) ? <option key={0}>{placeholder}</option> : <></>}
            {data.map((value) => {
                return (<option key={value.id} onClick={() => {setPlaceholderActive(false)}}>{value.name}</option>)
            })}            
        </select>
    </div>
  )
};

export default DropdownField;
