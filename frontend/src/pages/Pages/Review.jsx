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
      const data = {
        grant_type: 'client_credentials',
        client_id: siteConfig.LINKEDIN_APP_CLIENT_ID,
        client_secret: siteConfig.LINKEDIN_APP_CLIENT_SECRET
      };
      const res = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(res, selectedOne)
      const accessToken = res.data.access_token;
      const profileId = selectedOne.url.split('/').pop();

      fetch(`https://api.linkedin.com/v2/salesPreferences/people/${profileId}/savedItems`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'PROFILE',
          profile: {
            id: profileId,
          },
        }),
      })
        .then(response => {
          if (response.ok) {
            alert('Profile saved successfully!');
          } else {
            alert('Failed to save profile:', response.status);
          }
        })
        .catch(error => {
          alert('Error saving profile:', error);
        });
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
