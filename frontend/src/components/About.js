import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
const About = () => {
  const a = useContext(noteContext); //The context is used to access the state and update it.
  // useEffect(() => {
  //   a.update();
  // }, []);
  return <div>This is about page</div>;
};

export default About;
