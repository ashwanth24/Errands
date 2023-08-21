import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import navbar from './navbar.css'
function NavBar() {
  const [find,setFind] = useState("")

  const navigate = useNavigate();
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector((state)=>state.user.currentUser)
  console.log(user)
  return (
    <div className='container'>
      <div className="left">
        Errands
      </div>
      <div className="middle">
       <input className='searchBox' type="text" placeholder='Search' onChange={(e)=>{setFind(e.target.value)      }}
        onKeyPress={(e)=>{
          if(e.key=="Enter"){
            navigate(`/allproducts/${find}`)}
       }}/>
      </div>
      <div className="right">
        <a className="right_text user">
          Hello, {user.username}
        </a>
        <a className="right_text order">
          Orders
        </a>
       <Link className='Link' to={'/cart'}>
       <a className="right_text cart">
          Cart
        </a></Link>
        <div className='circle'>
          <span className="q">{quantity}</span>
        </div>

      </div>
    </div>
  )
}

export default NavBar
