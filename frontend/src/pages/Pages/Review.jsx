import React, { useEffect, useState } from 'react';
import ListBox from '../components/ListBox';
import axios from 'axios';
import siteConfig from '../config/site.config';
import Button from '../components/Button';

const Review = () => {
  const [data, setData] = useState([]);
  const [selectedOne, setSelectedOne] = useState({
    name: '',
    url: '',
    about: '',
    company: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${siteConfig.apiUrl}/peoples/matched`)
      setData(res.data.items)
      setSelectedOne(res.data.items[0])
    }
    fetchData();
  }, [])

  const handleLinkedNavigate = () => {
    if (selectedOne.url) {
      
    } else {
      alert('Linkedin Profile was not provided.')
    }
  }

  return (
    <div>
      <ListBox data={data} selected={selectedOne} handleSelect={(person) => {
        setSelectedOne(person)
      }} handleCheck={() => console.log()} checkBox={false} />
      <Button value='View' handleClick ={() => handleLinkedNavigate()} />
    </div>
  );
};

export default Review;
