import React, { useState } from 'react';
import { InputText, MyTextArea } from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [companyName, setCompanyName] = useState('');
  const [url, setUrl] = useState('');
  const [companyIntroduction, setCompanyIntroduction] = useState('');
  const [icp, setIcp] = useState('');
  const [others, setOthers] = useState('');

  const handleRegister = async (e) => {
    const compaines = JSON.parse(localStorage.getItem('sowcs')) || [];
    const data = {
      companyName, url, companyIntroduction, icp
    }
    localStorage.setItem('sowcs', JSON.stringify([...compaines, data]))
    alert('Successfully Registered!')
    setCompanyName('');
    setUrl('');
    setCompanyIntroduction('');
    setIcp('');
    setOthers('')
  };

  return (
    <div className="main-container">
      <InputText
        placeholder="Company Name"
        value={companyName}
        handleChange={(value) => {
          setCompanyName(value);
        }}
        readOnly={false}
      />
      <InputText
        placeholder="URL"
        value={url}
        handleChange={(value) => {
          setUrl(value);
        }}
        readOnly={false}
      />
      <MyTextArea
        placeholder="Company Introduction"
        value={companyIntroduction}
        handleChange={(value) => {
          setCompanyIntroduction(value);
        }}
      />
      <MyTextArea
        placeholder="ICP"
        value={icp}
        handleChange={(value) => {
          setIcp(value);
        }}
      />
      <MyTextArea
        placeholder="Other Information"
        value={others}
        handleChange={(value) => {
          setOthers(value);
        }}
      />
      <Button
        value="Register"
        handleClick={(e) => {
          handleRegister(e);
        }}
      ></Button>
    </div>
  );
};

export default Register;
