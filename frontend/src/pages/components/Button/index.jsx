import React from "react";
import './style.css'

const Button = (props) => {
  return <button className="button button-1" onClick={() => props.handleClick()}>{ props.value }</button>
}

export default Button