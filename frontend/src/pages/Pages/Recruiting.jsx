import React, { useState } from 'react';
import { InputText, MyTextArea } from '../components/Input';
import MyCombobox from '../components/Combobox';
import axios from 'axios';
import siteConfig from '../config/site.config';
import LoadingSpnner from '../components/Spinner';
import { useRef } from 'react';

const Recruiting = () => {
  const [jobDesc, setJobDesc] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [type, setType] = useState('resume');
  const [resume, setResume] = useState(null);
  const companies = JSON.parse(localStorage.getItem('sowcs')) || [];
  const [selectedCompany, setSelectedCompany] = useState((companies.length > 0 && companies[0]) || null);
  const options = companies?.map((item) => {
    return item.companyName
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const resultRef = useRef(null);

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const InputChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setResume(file);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  };

  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    resultRef.current.innerHTML = '';
    if (jobDesc) {
      const formData = new FormData();
      formData.append('jobDesc', jobDesc);
      formData.append('company', selectedCompany.name);
      formData.append('icp', selectedCompany.icp);
      formData.append('resume', resume);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const url = `${siteConfig.apiUrl}/company/resume`;
      setIsLoading(true);
      axios
        .post(url, formData, config)
        .then((res) => {
          if (res.data.ok) {
            resultRef.current.innerHTML = res.data.data.text.replace(
              /\r?\n|\r/g,
              '<br />'
            );
          } else {
            resultRef.current.innerHTML = res.data.data.replace(
              /\r?\n|\r/g,
              '<br />'
            );
          }

          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    } else {
      alert('Job Description can not be emplty.');
    }
  };

  const handleOptionSelect = (option) => {
    const company = companies.filter((company) => company.companyName === option);
    setSelectedCompany(company[0]);
  };

  const handleDescriptionChange = (value) => {
    setJobDesc(value);
  };

  const handleSubmitProfile = (e) => {};

  return (
    <div className="main-container">
      {isLoading && <LoadingSpnner />}
      <MyCombobox options={options} optionSelect={handleOptionSelect} />
      <MyTextArea
        value={jobDesc}
        handleChange={handleDescriptionChange}
        placeholder="Job Description"
      />
      <div className="plans">
        <div className="d-flex space-between">
          <label className="plan basic-plan" for="basic">
            <input
              type="radio"
              name="plan"
              id="basic"
              onChange={(e) => {
                if (e.target.checked) {
                  setType('resume');
                }
              }}
              checked={type === 'resume'}
            />
            <div className="plan-content">
              <div className="plan-details">
                <span>Upload Resume</span>
              </div>
            </div>
          </label>
          <label className="plan complete-plan" for="complete">
            <input
              type="radio"
              id="complete"
              name="plan"
              onChange={(e) => {
                if (e.target.checked) {
                  setType('profile');
                }
              }}
              checked={type === 'profile'}
            />
            <div className="plan-content">
              <div className="plan-details">
                <span>Linkedin Profile</span>
              </div>
            </div>
          </label>
        </div>
      </div>
      {type === 'resume' && (
        <div className="kb-data-box">
          <form onSubmit={FileUploadSubmit}>
            <div className="kb-file-upload">
              <div className="file-upload-box">
                <input
                  type="file"
                  id="fileupload"
                  className="file-upload-input"
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={InputChange}
                />
                <span>
                  Drag and drop or{' '}
                  <span className="file-link">Choose your file</span>
                </span>
              </div>
            </div>
            <div className="kb-attach-box mb-3">
              {resume && (
                <div className="file-atc-box">
                  <div className="file-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
                    </svg>
                  </div>
                  <div className="file-detail">
                    <h6>{resume.name}</h6>
                    <p>
                      <span>Size : {filesizes(resume.size)}</span>
                      <span className="ml-2">
                        Modified Time :{' '}
                        {resume.lastModifiedDate.toLocaleString('en-IN')}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="kb-buttons-box">
              {resume && (
                <button type="submit" className="button button-1">
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      {type === 'profile' && (
        <>
          <InputText
            placeholder="Linkedin Profile Link"
            value={profileLink}
            handleChange={(value) => {
              setProfileLink(value);
            }}
          />
          <div className="kb-buttons-box">
            <button onClick={handleSubmitProfile} className="button button-1">
              Ok
            </button>
          </div>
        </>
      )}
      <div style={{ textAlign: 'justify' }}>
        <span ref={resultRef}></span>
      </div>
    </div>
  );
};

export default Recruiting;
