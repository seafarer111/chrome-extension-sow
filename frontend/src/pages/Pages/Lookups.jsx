import React, { useEffect, useState } from 'react';
import MyCombobox from '../components/Combobox';
import { InputText } from '../components/Input';
import { getAll, GetUsersGPT } from '../api/company';
import ListBox from '../components/ListBox';
import Button from '../components/Button';

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
      const res = await getAll();
      const data = res.map((item) => {
        return item?.name;
      })
      setOptions(data);
      setCompanies(res);
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
    const sel = companies.filter((item) => item.name = selectedCom)
    const res = await GetUsersGPT({
      company: sel
    });
    setPersons(res);
    setSectedOne(res[0]);
    setIsLoading(false);
  };

  return (
    <div className="main-container lookups-window">
      <MyCombobox
        options={options}
        optionSelect={(opt) => handleSelectedOption(opt)}
      />
      <Button value="Search" handleClick={handleSearchCompany}></Button>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <>
          <ListBox
            persons={persons}
            selectedOne={selecteOne}
            handleSelectPerson={handleSelectPerson}
            handlePersonCheck={handlePersonCheck}
          />
          <InputText
            value={selecteOne.name}
            placeholder="Name"
            readOnly={true}
          />
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
      )
      }
    </div>
  );
};

export default Lookups;
