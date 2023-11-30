import React, { useState } from 'react';
import MyCombobox from '../components/Combobox';
import { InputText, MyTextArea } from '../components/Input';
import ListBox from '../components/ListBox';
import Button from '../components/Button';
import LoadingSpnner from '../components/Spinner';
import axios from 'axios';
import { getLinkedinAccessToken } from '../../../utils/utils';

const Lookups = () => {
  const companies = JSON.parse(localStorage.getItem('sowcs')) || [];
  const options = companies?.map((item) => {
    return item.companyName
  });
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selecteOne, setSectedOne] = useState({
    name: '',
    title: '',
    url: '',
  });

  const handleSelectedOption = async (option) => {
    const item = companies.filter(com => com.companyName === option);
    setSelectedCompany(item[0]);
  };

  const handleSelectPerson = (person) => {
    setSectedOne(person);
  };

  const handlePersonCheck = (person, check) => {
    const updated = employees.map((p) => {
      if (p.name === person.name) return { ...p, matched: check };
      else return { ...p };
    });
    setEmployees(updated);
  };

  const searchCompany = async () => {
    try {
      const response = await axios.get(
        'https://api.linkedin.com/v2/search',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('linkedAccessToken')}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
          params: {
            q: selectedCompany.companyName,
            company: true,
          },
        }
      );
      const companyUrn = response.data.elements[0].targetUrn;
      getCompanyEmployees(companyUrn);
    } catch (error) {
      console.error(error);
    }
  };

  // Retrieve employees of company
  const getCompanyEmployees = async (companyUrn) => {
    try {
      const response = await axios.get(
        `https://api.linkedin.com/v2/companies/${companyUrn}/employees`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('linkedAccessToken')}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        }
      );
      console.log(response.data.elements)
      setEmployees(response.data.elements);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchCompany = async () => {
    setIsLoading(true);
    await searchCompany();
    // const company = companies.filter((item) =>
    //   item.companName === selectedCom
    // );
    // console.log(company)


    // const res = await axios.post(`${siteConfig.apiUrl}/company/gpt`, com[0]);
    // if (res.data.ok) {
    //   setPersons(res.data.data);
    //   setSectedOne(res.data.data[0]);
    // } else {
    //   alert(res.data.data + ' with Linkedin API.')
    // }
    setIsLoading(false);
  };

  return (
    <div className="main-container lookups-window">
      <MyCombobox
        options={options}
        optionSelect={(opt) => handleSelectedOption(opt)}
      />
      <Button value="Search" handleClick={handleSearchCompany}></Button>
      {isLoading && <LoadingSpnner />}
      <>
        <ListBox
          data={employees}
          selected={selecteOne}
          handleSelect={handleSelectPerson}
          handleCheck={handlePersonCheck}
          checkBox={true}
        />
        <InputText value={selecteOne.name} placeholder="Name" readOnly={true} />
        <MyTextArea
          value={selecteOne.about}
          placeholder="Title"
          readOnly={true}
        />
        <InputText
          value={selecteOne.url}
          placeholder="Profile Link"
          readOnly={true}
        />
      </>
    </div>
  );
};

export default Lookups;
