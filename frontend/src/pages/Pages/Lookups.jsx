import React, { useEffect, useState } from 'react';
import MyCombobox from '../components/Combobox';
import { InputText } from '../components/Input';
import { getAll } from '../api/company';
import ListBox from '../components/ListBox';
import Button from '../components/Button';
import LoadingSpnner from '../components/Spinner';
import axios from 'axios';
import siteConfig from '../config/site.config';

const Lookups = () => {
  const [companies, setCompanies] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCom, setSelectedCom] = useState('');
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selecteOne, setSectedOne] = useState({
    name: '',
    title: '',
    url: '',
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await axios.get(`${siteConfig.apiUrl}/company/all`);
      console.log(res)
      // const data = res.map((item) => {
      //   return item?.name;
      // });
      // setOptions(data);
      // setCompanies(res);
      // setSelectedCom(data[0]);
    };
    fetchCompanies();
  }, []);

  const handleSelectedOption = async (opt) => {
    setSelectedCom(opt);
  };

  const handleSelectPerson = (person) => {
    setSectedOne(person);
  };

  const handlePersonCheck = (person, check) => {
    const updated = persons.map((p) => {
      if (p.name === person.name) return { ...p, matched: check };
      else return { ...p };
    });
    setPersons(updated);
  };

  const handleSearchCompany = async () => {
    setIsLoading(true);
    const sel = companies.filter((item) => (item.name = selectedCom));
    const res = await axios.post(`${siteConfig.apiUrl}/company/gpt`, sel[0]);
    if (res.data.ok) {
      setPersons(res.data.data);
      setSectedOne(res.data.data[0] );
    } else {
      alert(res.data.data + ' with Linkedin API.')
    }
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
          data={persons}
          selected={selecteOne}
          handleSelect={handleSelectPerson}
          handleCheck={handlePersonCheck}
          checkBox={true}
        />
        <InputText value={selecteOne.name} placeholder="Name" readOnly={true} />
        <InputText
          value={selecteOne.title}
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
