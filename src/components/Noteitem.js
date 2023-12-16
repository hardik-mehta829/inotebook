import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { n, updateNote } = props;
  const handleDelete = () => {
    deleteNote(n);
  };

  return (
    <div className='col-md-3'>
      <div className='card my-3'>
        {/*col-md-3 className to give width to each card element. my-3 to give margin in y direction*/}
        <div className='card-body'>
          <h5 className='card-title'>{n.title}</h5>
          <p className='card-text'>{n.description}</p>
          <i className='fa-sharp fa-solid fa-trash' onClick={handleDelete}></i>
          <i
            className='fa-regular fa-pen-to-square mx-2'
            onClick={() => {
              updateNote(n);
            }}
          ></i>
          {/*mx-2 className to give margin in x-direction*/}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
