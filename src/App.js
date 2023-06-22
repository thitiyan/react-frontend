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
          
          <Route path='/react-ken' element={<Users />} />
          <Route path='/react-ken/login' element={<Login />} />
          <Route path='/react-ken/create' element={<UserCreate />} />
          <Route path='/react-ken/update/:id' element={<UserUpdate />} />
          <Route path='/react-ken/picture' element={<Picture />} />
          <Route path='/react-ken/repicture' element={<Repicture />} />
        </Routes>
    </div>
  );
}



export default App;
