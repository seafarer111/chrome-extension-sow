import React from "react";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import "./style.css";

export default function MyCombobox(props) {

  return (
    <div className="combo-container">
      <ComboBox
        options={props.options}
        placeholder="Choose a company"
        defaultIndex={0}
        optionsListMaxHeight={300}
        style={{
          width: "280px",
          margin: "0 auto",
        }}
        focusColor="#20C374"
        renderOptions={(option) => (
          <div className="comboBoxOption">{option}</div>
        )}
        defaultValue={props.options[0]}
        onSelect={(option) => props.optionSelect(option)}
        onChange={(event) => console.log(event.target.value)}
        enableAutocomplete
      // onOptionsChange={(option) => setHighlightedOption(option)}
      />
    </div>
  );
}
