import React from "react";
import './style.css'

 const InputText = (props) => {
  return (
    <label className="custom-field one">
      <input type="text" placeholder=" " value={props.value} onChange={(e) => props.handleChange(e.target.value)} readOnly={props.readOnly} />
      <span className="placeholder">{ props.placeholder }</span>
    </label>
  )
}

export default InputText;