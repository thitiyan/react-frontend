/* import logo from './logo.svg';
import './App.css'; */
import Navbar from './Navbar.js';
import Users from './Users'
import { Routes, Route } from "react-router-dom";
import UserCreate from "./UserCreate"
import UserUpdate from "./UserUpdate"
import Login from "./login.js"
import Picture from "./picture.js"
import Repicture from "./repicture.js";
function App() {
  return (
    <div className='App'>
<Navbar />
<Routes>
          
          <Route path='/' element={<Users />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/update/:id' element={<UserUpdate />} />
          <Route path='/picture' element={<Picture />} />
          <Route path='/repicture' element={<Repicture />} />
        </Routes>
    </div>
  );
}



export default App;
