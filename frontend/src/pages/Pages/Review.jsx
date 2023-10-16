import React, { useEffect, useState } from 'react';
import ListBox from '../components/ListBox';
import axios from 'axios';
import siteConfig from '../config/site.config';
import Button from '../components/Button';
import qs from 'querystring'

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

  const handleLinkedNavigate = async () => {
    if (selectedOne.url) {
      const res = await axios.post(`${siteConfig.apiUrl}/peoples/salesnavigator`, {
        data: selectedOne
      })

      if (res.data.ok) {
        alert('Linkedin Profile was successfully added to sales navigator.')
      } else {
        alert('Something went wrong.')
      }
    } else {
      alert('Linkedin Profile was not provided.')
    }
  }

  return (
    <div>
      <ListBox data={data} selected={selectedOne} handleSelect={(person) => {
        setSelectedOne(person)
      }} handleCheck={() => console.log()} checkBox={false} />
      <Button value='View' handleClick={() => handleLinkedNavigate()} />
    </div>
  );
};

export default Review;
