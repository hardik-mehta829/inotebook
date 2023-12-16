import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, setNote, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [newnote, setNewnote] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [Modal, setModal] = useState(false);
  /*row className so all children are in row*/
  useEffect(() => {
    getAllNotes();
  }, []);
  const updateNote = (n) => {
    console.log('updated');
    ref.current.click();
    setNewnote({ ...n });
    setModal(true);
  };
  const handleSubmit = () => {
    // console.log(newnote.title);
    const newnotes = notes.filter((n) => {
      return n._id !== newnote._id;
    });
    setTitle('');
    setDescription('');
    setTag('');
    setNote(newnotes.concat(newnote));
    editNote(newnote);
    setModal(false);
  };
  const handleClick = () => {
    refClose.current.click();
  };
  return (
    <>
      <Addnote />
      <button
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Modal
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form className='my-3'>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label' name='title'>
                    title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    name='title'
                    aria-describedby='emailHelp'
                    required
                    minLength={5}
                    value={newnote ? newnote.title : ''}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setNewnote({
                        ...newnote,
                        [e.target.name]: e.target.value,
                      });
                    }}
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
                    name='description'
                    required
                    minLength={5}
                    value={newnote ? newnote.description : ''}
                    onChange={(e) => {
                      setDescription(e.target.value);

                      setNewnote({
                        ...newnote,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor='tag' className='form-label' name='tag'>
                    tag
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='tag'
                    name='tag'
                    required
                    value={newnote ? newnote.tag : ''}
                    onChange={(e) => {
                      setTag(e.target.value);
                      setNewnote({
                        ...newnote,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* <button type='submit' className='btn btn-primary'>
                  Update Note
                </button> */}
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                arai-label='close'
                ref={refClose}
                disabled={
                  (newnote && newnote.title.length < 3) ||
                  (newnote && newnote.description.length < 5)
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <div className='contanier'>
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((n) => {
          return <Noteitem n={n} key={n._id} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
