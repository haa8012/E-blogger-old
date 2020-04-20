import React, { Fragment, useState, useContext } from 'react';
import BlogContext from '../../context/blog/blogContext';
import axios from 'axios';

const FileUpload = () => {
  const blogContext = useContext(BlogContext);
  const { setFilePath } = blogContext;

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setFilePath(filePath);
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label htmlFor='file-upload' className='custom-file-upload'>
          <i className='fas fa-cloud-upload-alt'></i> Upload image
        </label>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          name='photo'
          onChange={onChange}
        />

        {/* 
          <input
            type='file'
            className='custom-file-upload'
            id='customFile'
            onChange={onChange}
          /> */}

        {/* <label className='custom-file-label' htmlFor='customFile'></label> */}
        {filename}

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div>
          <h3 className='text-center'>{uploadedFile.fileName}</h3>
          <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
