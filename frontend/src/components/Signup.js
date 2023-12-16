import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const context = useContext(noteContext);
  const { token, setToken, showAlert } = context;
  const [detail, setDetail] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:5000/api/auth/createuser',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            name: detail.name,
            email: detail.email,
            password: detail.password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error('Please enter valid credentials');
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/home');
        showAlert('Signed up successfully', 'success');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
    setDetail({ name: '', email: '', password: '' });
  };
  return (
    <div>
      <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={detail.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='text'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            value={detail.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            required
            minLength={5}
            value={detail.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <button
          type='button'
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
