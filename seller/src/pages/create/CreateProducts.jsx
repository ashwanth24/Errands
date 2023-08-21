import React, { useState } from 'react'
import './create.css'
import { useDispatch, useSelector } from 'react-redux'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,

} from 'firebase/storage'
import app from '../../firebase'
import { addProduct } from '../../redux/apiCalls'
function CreateProducts() {
    const [input,setInput] = useState({})
    const [cat,setcat] = useState([])
    const [file,setFile] = useState(null)
    const [color,setcolor] = useState([])
    const [size,setsize] = useState([])
    const dispatch = useDispatch()

    const sellerId = useSelector(state=>state.user.currentUser._id)
    console.log(sellerId)

    const handleinput =(e)=>{
        setInput(prev=>{
            return{...prev,[e.target.name]:e.target.value}
        })
    }
    const handlesize =(e)=>{
        setsize(e.target.value.split(","))
    }
    const handlecolor =(e)=>{
        setcolor(e.target.value.split(","))
    }
    const handlecat =(e)=>{
        setcat(e.target.value.split(","))
    }
    const handleClick=(e)=>{
        e.preventDefault();
        const fileName = new Date().getTime()+file.name
        const storage  = getStorage(app)
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef,file);


        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          }, 
          (error) => {
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //console.log({...inputs, img: downloadURL,category:cat});
              const product = {...input,img : downloadURL , categories:cat,color:color,size:size,sellerId:sellerId};
              console.log(product)
              addProduct(product,dispatch)
              
              alert("product added")
            });
          }
        );
    }

    //console.log(input,cat,color,size)





  return (
    <div className='CreateContainer'>
    <form action="" className="Productsform">
    <div className="title">
            <input name='img' placeholder='Add Image' type="file" className="Pimg img" onChange={e=>setFile(e.target.files[0])} />
        </div>
        <div className="title">
            <input name='title' placeholder='Product Name' type="text" className="Ptitle input" onChange={handleinput} />
        </div>
        <div className="title">
            <input name='decs' placeholder='Product Decription' type="text" className="Pdecs input" onChange={handleinput}/>
        </div>
        <div className="title">
            <input name='price' placeholder='Product Price' type="number" className="Pprice input" onChange={handleinput} />
        </div>
        <div className="title">
            <input name='categories' placeholder='Product Catogory' type="text" className="pcat input" onChange={handlecat} />
        </div>
        <div className="title">
            <input name='color' placeholder='Product color' type="text" className="pcolor input" onChange={handlecolor} />
        </div>
        <div className="title">
            <input name='size' placeholder='Product size' type="text" className="psize input" onChange={handlesize} />
        </div>
        
        <button onClick={handleClick} className="psubmit">Submit</button>
        <button onClick={handleClick} className="psubmit">Add another Product</button>

    </form>
    </div>
  )
}

export default CreateProducts
