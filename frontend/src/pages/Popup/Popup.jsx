import React, { useState } from 'react';
import './Popup.css';
import Salesops from '../Pages/Salesops';
import Button from '../components/Button';
import Register from '../Pages/Register';
import Lookups from '../Pages/Lookups';
import Recruiting from '../Pages/Recruiting';
import Review from '../Pages/Review';
import { useEffect } from 'react';
import axios from 'axios';

const PAGESTATE = {
  DASHBOARD: 'dashboard',
  SALESOPS: 'salesops',
  LOOKUP: 'lookup',
  REGISTER: 'register',
  RECRUNITING: 'recruiting',
  REVIEW: 'review'
}

const Popup = () => {
  const [pageState, setPageState] = useState(PAGESTATE.DASHBOARD);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          'https://www.linkedin.com/oauth/v2/accessToken',
          {
            grant_type: 'client_credentials',
            client_id: '77eauu35zqfntv',
            client_secret: '77eauu35zqfntv',
          }
        );
        console.log(response.data.access_token);
        localStorage.setItem('linkedAccessToken', response.data.access_token);
      } catch (error) {
        console.error(error);
      }
    };
    console.log('sss')
    getAccessToken();
  }, [])

  return (
    <div className="App">
      {
        pageState === PAGESTATE.DASHBOARD &&
        (
          <div className='flex flex-column'>
            <div className='flex flex-column'>
              <h2 className='flex '><span className='logo-text '>SOW</span>&nbsp;Plugin<span>(v1.0.0)</span></h2>
              <div className='menu'>
                <Button value='Sales Ops' handleClick={() => {
                  setPageState(PAGESTATE.SALESOPS)
                }} />
                <Button value='Recruiting' handleClick={() => {
                  setPageState(PAGESTATE.RECRUNITING)
                }} />
                <Button value='Review' handleClick={() => {
                  setPageState(PAGESTATE.REVIEW)
                }} />
              </div>
            </div>
            <div className='flex flex-column'>
              <span>Welcome Back!</span>
              <span>chrome://extension</span>
            </div>
          </div>
        )
      }
      {
        pageState === PAGESTATE.SALESOPS &&
        (
          <>
            <ul className="breadcrumb">
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.DASHBOARD)}>SOW plugin</div></li>
              <li>SalesOPS</li>
            </ul>
            <Salesops
              onRegister={() => {
                setPageState(PAGESTATE.REGISTER)
              }}
              onLookup={() => {
                setPageState(PAGESTATE.LOOKUP)
              }} />
          </>
        )
      }
      {
        pageState === PAGESTATE.REGISTER && (
          <>
            <ul className="breadcrumb">
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.DASHBOARD)}>SOW plugin</div></li>
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.SALESOPS)}>SalesOPS</div></li>
              <li>Register</li>
            </ul>
            <Register />
          </>
        )
      }
      {
        pageState === PAGESTATE.LOOKUP && (
          <>
            <ul className="breadcrumb">
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.DASHBOARD)}>SOW plugin</div></li>
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.SALESOPS)}>SalesOPS</div></li>
              <li>Lookup</li>
            </ul>
            <Lookups />
          </>
        )
      }
      {
        pageState === PAGESTATE.RECRUNITING && (
          <>
            <ul className="breadcrumb">
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.DASHBOARD)}>SOW plugin</div></li>
              <li>Recruiting</li>
            </ul>
            <Recruiting />
          </>
        )
      }
      {
        pageState === PAGESTATE.REVIEW && (
          <>
            <ul className="breadcrumb">
              <li className='clickable'><div onClick={() => setPageState(PAGESTATE.DASHBOARD)}>SOW plugin</div></li>
              <li>Review</li>
            </ul>
            <Review />
          </>
        )
      }
    </div >
  );
};

export default Popup;
