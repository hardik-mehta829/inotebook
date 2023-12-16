import { useEffect, useState } from 'react';
import NoteContext from './NoteContext';
const NoteState = (props) => {
  const [notes, setNote] = useState([]);
  const [token, setToken] = useState('');
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  const getAllNotes = async () => {
    console.log('Fetch all notes');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/note/allnotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // const newnotes = notes.concat(data.notes);
      setNote([...data.notes]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    console.log(notes);
  }, [notes]);
  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       name: 'lardik',
  //       class: '11',
  //     });
  //   }, 2000);
  // };
  const addNote = async ({ title, description, tag }) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/note/addnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) throw new Error('Note cannot be added');
      const data = await response.json();

      setNote(notes.concat(data.note));
      showAlert('Note added successfully', 'success');
      console.log(notes); //Concat returns an array while push updates an array.
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };
  const deleteNote = async (note) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/note/deletenote/${note._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      );
      if (!response.ok) throw new Error('Note cannot be deleted');
      const data = await response.json();

      const newnotes = notes.filter((n) => {
        return n._id !== note._id;
      });
      setNote(newnotes);
      showAlert('Note deleted succesfully', 'success');
      console.log(notes);
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };
  const editNote = async ({ _id, title, description, tag }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/note/updatenote/${_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );
      if (!response.ok) throw new Error('Note cannot be updated');
      const data = await response.json();
      showAlert('Note updated successfully', 'success');
    } catch (error) {
      showAlert(error.message, 'success');
    }
  };

  return (
    // When we wrap anything between noteState it provides the value as state and update to all the components present in between it  and also to its children
    <NoteContext.Provider
      value={{
        notes,
        setNote,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        setToken,
        token,

        showAlert,
        alert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
