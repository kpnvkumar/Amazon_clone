import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const Account = () => {
    const [details,changeDetails]=useState(0)

    const user_id=localStorage.getItem('user_id')
    const logout=()=>{
      localStorage.setItem("user_id",null)
      localStorage.setItem("name",null)
      window.location.replace('/')
    }

    const FetchData= async()=>{
      
        const data= new FormData();

        data.append("user_id",user_id)

        const Response= await axios.post("http://localhost:8000/get-account.php",data,{headers:{'content-type':'multipart/form-data'}})
    
        if(Response){
          console.log(Response.data.data[0])
          changeDetails(Response.data.data[0])
          console.log('ok')
      
        }
    
        
      }
      useEffect(()=>{
        if(user_id && user_id !== "null"){
          FetchData()
        }
        else{
          window.location.replace('/login')
        }
      },[user_id]
      )
  return (
    <div className='accountpage'>
        <div className='accounts-header'>
          <h3>Your Account</h3>
          <div className='detailsbar'>
            <div className='profile'>
              <img alt="" className="imggg" src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png"></img>
            </div>
            <div className='userdetails'>
              <p>Name : {details.first_name}</p>
              <p>Phn No :{details.phone_number}</p>
              <p>Email : {details.email}</p>
            </div>
          </div>
        </div>
      
        <div className='container-accountsections'>
          <div className=' account d-flex flex-wrap'>
            <div className='d-flex border accounts-block'>
              <img  alt="" className="imggg" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"></img>
              <div>
                <h5>Your orders</h5>
                <p>Track,return,or buy things again</p>
              </div>
            </div>
            <div className='d-flex border accounts-block'>
              <img alt="" className="imggg" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"></img>
              <div>
                <h5>Login & security</h5>
                <p>Edit login, name, and mobile number</p>
              </div>
            </div>
            <div className='d-flex border accounts-block'>
              <img alt="" className="imggg" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/rc_prime._CB485926807_.png"></img>
              <div>
                <h5>Prime</h5>
                <p>View benefits and payment settings</p>
              </div>
            </div>
            <div className='d-flex border accounts-block'>
              <img  alt="" className="imggg"src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"></img>
              <div>
                <h5>Your Addresses</h5>
                <p>Edit addresses for orders and gifts</p>
              </div>
            </div>
            <div className='d-flex border accounts-block'>
              <img alt="" className="imggg" src="https://m.media-amazon.com/images/G/31/AmazonBusiness/YAPATF/amazon_business_yap_atf._CB588250268_.jpg"></img>
              <div>
                <h5>Your business account</h5>
                <p>Sign up for free to save up to 28% with GST invoice and bulk discounts and purchase on credit</p>
              </div>
            </div>
            <div className='d-flex border accounts-block'>
              <img alt="" className="imggg" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png"></img>
              <div>
                <h5>Payment options</h5>
                <p>Edit or add payment methods</p>
              </div>
            </div>
            <div className='d-flex border accounts-block '>
              <img alt="" className="imggg" src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/amazon_pay._CB485946857_.png"></img>
              <div>
                <h5>Amazon Pay balance</h5>
                <p>Add money to your balance</p>
              </div>
            </div>
           
          </div>
        </div>
        <div className='logout-section'>
        <button onClick={()=>{logout()}}className='btn btn-danger logoutbtn'>logout</button>
        </div>
    </div>
  )
}

export default Account