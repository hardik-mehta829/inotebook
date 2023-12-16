import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');
  const navigate = useNavigate(); //To redirect to another page
  const context = useContext(noteContext);
  const { setToken, showAlert } = context;

  const handleSubmit = async () => {
    console.log(email);
    console.log(password);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Please enter valid credentials');
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/home');
        showAlert('Logged in successfully', 'success');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }

    Setemail('');
    Setpassword('');
  };
  return (
    <div className='my-3'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='text'
            className='form-control'
            id='email'
            name='email'
            value={email}
            aria-describedby='emailHelp'
            onChange={(e) => {
              Setemail(e.target.value);
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
            value={password}
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
          />
        </div>
        <button
          type='button'
          className='btn btn-primary'
          onClick={(e) => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
