import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

const Alert = () => {
  const { showAlert, alert } = useContext(noteContext);

  return (
    <div style={{ height: '50px' }}>
      {alert && (
        <div
          className={`alert alert-${
            alert.type === 'danger' ? 'danger' : 'primary'
          }`}
          role='alert'
        >
          {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
