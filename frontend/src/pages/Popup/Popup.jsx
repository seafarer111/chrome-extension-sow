import React, { useState } from 'react';
import './Popup.css';
import Salesops from '../Pages/Salesops';
import Button from '../components/Button';
import Register from '../Pages/Register';
import Lookups from '../Pages/Lookups';
import Recruiting from '../Pages/Recruiting';

const PAGESTATE = {
  DASHBOARD: 'dashboard',
  SALESOPS: 'salesops',
  LOOKUP: 'lookup',
  REGISTER: 'register',
  RECRUNITING: 'recruiting'
}

const Popup = () => {
  const [pageState, setPageState] = useState(PAGESTATE.DASHBOARD);
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
    </div >
  );
};

export default Popup;
