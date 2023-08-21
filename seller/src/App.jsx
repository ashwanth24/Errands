import Orders from "./pages/Orders";
import Products from "./pages/products/Products" ;
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import CreateProducts from "./pages/create/CreateProducts";
import { login } from "./redux/apiCalls";
import './app.css'

function App() {
  const user = useSelector(state=>state.user.currentUser)
  console.log(user)
  return (
    <Router>
    <Routes>
      <Route path='/login' element={user?<Home/>:<Login/>}/>
    </Routes>
    <Routes>
      <Route path='/register' element={!user?<Register/>:<Home/>}/>
    </Routes>
    <Routes>
      <Route path='/' element={user?<Home/>:<Login/>}/>
    </Routes>
    <Routes>
      <Route path='/products' element={user?<Products/>:<Login/>}/>
    </Routes>
    <Routes>
      <Route path='/orders' element={<Orders/>}/>
    </Routes>
    <Routes>
      <Route path='/create' element={<CreateProducts/>}/>
    </Routes>
    

  </Router>
  );
}

export default App;
