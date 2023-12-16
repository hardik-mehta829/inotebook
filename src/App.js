import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className='container'>
            {/*Container class brings item to the center*/}
            <Routes>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/logout' element={<Logout />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
