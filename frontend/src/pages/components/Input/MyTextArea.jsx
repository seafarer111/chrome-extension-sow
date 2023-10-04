import React from "react";
import './style.css'

const MyTextArea = (props) => {
  return (
    <label className="custom-field one">
      <textarea type="text" placeholder=" " value={props.value} onChange={(e) => props.handleChange(e.target.value)} />
      <span className="placeholder">{ props.placeholder }</span>
    </label>
  )
}

export default MyTextArea;