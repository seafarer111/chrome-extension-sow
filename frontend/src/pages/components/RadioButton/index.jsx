import React from "react";
import './style.css'

const RadioButton = (props) => {

  return (
    <>
      <input type="radio" id={props.name} name="selector" />
      <label for={props.name}>{props.name}</label>
      <div class="check"></div>
    </>
  )
}

export default RadioButton;