import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { deleteProduct, findProducts } from '../../redux/apiCalls'
import './products.css'
const Productss = () => {
  const [products,setProducts] = useState([])
  const user = useSelector(state=>state.user.currentUser)
  console.log(user)
  const deleteP = (id)=>{
    deleteProduct(id)
    window.location.reload()
  }
  useEffect(()=>{
    const getproduct=async()=>{
      const res = await findProducts(user._id)
      setProducts(res.data.products)
    }
    getproduct()
  },[])
  
  console.log(products)
  return (
    <div className='ProductsContaier'>
          <div className="Products">
        <span className="ProductTitle">Products</span>
        <span className="ProductTitle">Title</span>
        <span className="Price">Price</span>
        <span className="ProductTitle">Actions</span>
        </div>

      {products.map((i)=>(
        
          <div className="Products s">
        <img src={i.img} alt="img" className="ProductsImg" />
        <span className="ProductTitle common">{i.title}</span>
        <span className="Price common">{i.price}</span>
        <button className="Update common">Update</button>
        <button className="Delete common" onClick={()=>deleteP(i._id)}>Delete</button>
      </div>
      ))}
      
         </div>
  )
}

export default Productss
