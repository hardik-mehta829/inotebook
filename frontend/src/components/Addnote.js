import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';

const Addnote = () => {
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const { addNote } = useContext(noteContext);
  const handleDescription = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent page from loading
    addNote(note);
    setNote({ title: '', description: '', tag: '' });
  };
  return (
    <div className='container my-3'>
      {/*my-3 class used to give margin in y axis*/}
      <h1>Add a note</h1>
      <form className='my-3'>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label' name='title'>
            title
          </label>
          <input
            type='text'
            className='form-control'
            value={note.title}
            id='title'
            name='title'
            required
            minLength={5}
            aria-describedby='emailHelp'
            onChange={handleDescription}
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='description'
            className='form-label'
            name='description'
          >
            description
          </label>
          <input
            type='text'
            className='form-control'
            id='description'
            value={note.description}
            name='description'
            required
            minLength={5}
            onChange={handleDescription}
          />
          <label htmlFor='tag' className='form-label' name='tag'>
            tag
          </label>
          <input
            type='text'
            className='form-control'
            value={note.tag}
            id='tag'
            name='tag'
            onChange={handleDescription}
            required
          />
        </div>
        <button
          type='submit'
          disabled={note.title.length < 3 || note.description.length < 5}
          className='btn btn-primary'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <h1>Your notes</h1>
    </div>
  );
};

export default Addnote;
