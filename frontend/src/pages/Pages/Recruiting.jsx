import React, { useState } from 'react';
import { InputText } from '../components/Input';
import Button from '../components/Button';

const Recruiting = () => {
  const [jobLink, setJobLink] = useState('');
  const [type, setType] = useState('resume');

  const [selectedfile, SetSelectedFile] = useState('');
  const [Files, SetFiles] = useState([]);
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
      SetSelectedFile({
        id: 'sss',
        filename: e.target.files[0].name,
        filetype: e.target.files[0].type,
        fileimage: reader.result,
        datetime: e.target.files[0].lastModifiedDate.toLocaleString('en-IN'),
        filesize: filesizes(e.target.files[0].size),
      });
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(file);
    }
  };

  const DeleteSelectFile = (id) => {
    if (window.confirm('Are you sure you want to delete this Image?')) {
      const result = selectedfile.filter((data) => data.id !== id);
      SetSelectedFile(result);
    } else {
      // alert('No');
    }
  };

  const FileUploadSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (selectedfile !== '') {
      SetFiles((preValue) => {
        return [...preValue, selectedfile];
      });
      SetSelectedFile('');
    } else {
      alert('Please select file');
    }
  };

  return (
    <div className="main-container">
      <InputText
        placeholder="Job Description Link"
        value={jobLink}
        handleChange={(value) => {
          setJobLink(value);
        }}
      />
      <div class="plans">
        <div className="d-flex space-between">
          <label class="plan basic-plan" for="basic">
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
            <div class="plan-content">
              <div class="plan-details">
                <span>Upload Resume</span>
              </div>
            </div>
          </label>
          <label class="plan complete-plan" for="complete">
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
            <div class="plan-content">
              <div class="plan-details">
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
                  onChange={InputChange}
                />
                <span>
                  Drag and drop or{' '}
                  <span className="file-link">Choose your file</span>
                </span>
              </div>
            </div>
            <div className="kb-attach-box mb-3">
              {selectedfile !== '' ? (
                <div className="file-atc-box">
                  {selectedfile.filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                    <div className="file-image">
                      {' '}
                      <img src={selectedfile.fileimage} alt="" />
                    </div>
                  ) : (
                    <div className="file-image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
                      </svg>
                    </div>
                  )}
                  <div className="file-detail">
                    <h6>{selectedfile.filename}</h6>
                    <p>
                      <span>Size : {selectedfile.filesize}</span>
                      <span className="ml-2">
                        Modified Time : {selectedfile.datetime}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="kb-buttons-box">
              <button type="submit" className="button button-2">
                Upload
              </button>
            </div>
          </form>
          {Files.length > 0 ? (
            <div className="kb-attach-box">
              <hr />
              {Files.map((data, index) => {
                const {
                  id,
                  filename,
                  filetype,
                  fileimage,
                  datetime,
                  filesize,
                } = data;
                return (
                  <div className="file-atc-box" key={index}>
                    {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                      <div className="file-image">
                        {' '}
                        <img src={fileimage} alt="" />
                      </div>
                    ) : (
                      <div className="file-image">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                        >
                          <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
                        </svg>
                      </div>
                    )}
                    <div className="file-detail">
                      <h6>{filename}</h6>
                      <p>
                        <span>Size : {filesize}</span>
                        <span className="ml-3">
                          , Modified Time : {datetime}
                        </span>
                      </p>
                      <div className="file-actions">
                        <button
                          className="file-action-btn"
                          onClick={() => DeleteSelectFile(id)}
                        >
                          Delete
                        </button>
                        <a
                          href={fileimage}
                          className="file-action-btn"
                          download={filename}
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ''
          )}
        </div>
      )}
      {type === 'profile' && (
        <InputText
          placeholder="Linkedin Profile Link"
          value={jobLink}
          handleChange={(value) => {
            setJobLink(value);
          }}
        />
      )}
      <Button value="Ok" handleClick={() => {}} />
    </div>
  );
};

export default Recruiting;
