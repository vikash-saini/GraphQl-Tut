import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate();
const token = localStorage.getItem('token');

// if (!token) {
//   console.log("here");
  
//   navigate("/login");
// }
  return (
    <div className="App">
      <Navbar/>
      <div className='container'>
      <Outlet/>
      </div>
      
    </div>
  );
}

export default App;
