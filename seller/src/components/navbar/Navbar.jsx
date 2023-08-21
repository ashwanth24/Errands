import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSeller } from '../../redux/apiCalls'
import {Link} from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
  const [truee,setTruee] = useState(false)
  const dispatch = useDispatch()
  const handleLogout=()=>{
    logoutSeller(dispatch)
    window.location.reload()
  }

  const user = useSelector(state=>state.user.currentUser)
  console.log(user)
  return (
    <div className='NavContainer'>
     <div className="left">LOGO</div>
     <div className="middle">
      <Link to={'/'}><div className="home">HOME</div></Link>
      <Link to={'/products'}><div className="products">PRODUCTS</div></Link>
      <Link to={'/orders'}><div className="orders">ORDERS</div></Link>
     </div>
     <div className="right">
     <span className="userName">Welcome {user.username}</span>
     <img src={user.image} alt="" className="userImg" onClick={()=>setTruee((prev)=>!prev)} />
     {truee && <div className="divuser">
      <span className="profile">profile</span>
      <button className="logout" onClick={handleLogout}>logout</button>
     </div> }
     
     </div>
    </div>
  )
}

export default Navbar
