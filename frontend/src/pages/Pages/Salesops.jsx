import React from 'react';
import Button from '../components/Button';

const Salesops = (props) => {
  return (
    <div>
      <Button
        handleClick={() => {
          props.onRegister();
        }}
        value="Register"
      />
      <Button
        value="Look Up"
        handleClick={() => {
          props.onLookup();
        }}
      />
    </div>
  );
};

export default Salesops;
