import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import Notes from './Notes';
import Addnote from './Addnote';
const Home = () => {
  const context = useContext(noteContext);
  const { token } = context;
  return (
    <div>
      {localStorage.getItem('token') ? (
        <Notes />
      ) : (
        'Login to view the Notes page'
      )}
    </div>
  );
};

export default Home;
