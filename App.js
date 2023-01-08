
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/pages/AddProduct';
import Profile from './components/pages/Profile';
import ProductList from './components/pages/ProductList';
import UpdateProduct from './components/pages/UpdateProduct';



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element ={<PrivateComponent/>}>
          
          <Route path="/" element={<ProductList />} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/logout' element={<h1>Log Out</h1>} />
         </Route>
         
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login />} />
        </Routes>


      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
