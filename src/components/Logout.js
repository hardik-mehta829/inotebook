import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setToken } = useContext(noteContext);
  const navigate = useNavigate();
  useEffect(() => {
    setToken('');
  }, []);
  return <div>You are logged out</div>;
};

export default Logout;
