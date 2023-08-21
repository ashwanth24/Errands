import{publicRequest,userRequest} from "../requestMeathods"
import {loginFailure,loginStart,loginSuccess,logout} from './userRedux'
import {
    addProductFailure,
    addProductStart,
    addProductSuccess,
  } from "./productRedux";

export const login = async (dispatch,user)=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/seller/seller-login",user)
        // console.log(user)
        // console.log(res.data)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}
export const logoutSeller = async(dispatch)=>{
    dispatch(logout())

}
export const deleteProduct = async(productId)=>{
    try {
        await userRequest.delete(`products/delete/${productId}`)
    } catch (error) {
        
    }
}
export const findProducts = async(sellerId)=>{
    try {
       const data= await userRequest.get(`seller/seller-find/${sellerId}`)
       // console.log(data)
        return data
    } catch (error) {
     console.log(error)   
    }
}
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products/create`,product);
      dispatch(addProductSuccess(res.data));
      console.log(product)
  
    } catch (err) {
      dispatch(addProductFailure());
    }
  };