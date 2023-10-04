import React from "react";
import './style.css'

const RadioButton = (props) => {

  return (
    <p>
      <input type="radio" id={props.id} checked={props.value} onChange={(e) => {props.setChecked(e.target.checked)}} />
      <label htmlFor={props.id}>{props.title}</label>
    </p>
  )
}

export default RadioButton;