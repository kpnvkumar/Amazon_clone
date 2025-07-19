import React from 'react'
import axios from 'axios'

function SignUp() {
  const fetchData = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('first_name', document.getElementById('signup-firstname').value);
    data.append('last_name', document.getElementById('signup-lastname').value);
    data.append('email', document.getElementById('signup-email').value);
    data.append('phone_number', document.getElementById('signup-mobileno').value);
    data.append('password', document.getElementById('signup-password').value);
    const response = await axios.post("http://localhost:8000/signup.php", data, {headers: { 'Content-Type': 'multipart/form-data' }});
    if (response) {
      console.log(response.data);
      window.location.replace("/")
    } else {
        console.log('error');
    }
  }

  return (
    <div className='signup'>
      <form onSubmit={fetchData}>
        <div className='additional-details'>
          <div className='Outerbox'>
            <div className='signup-header'><h2>Create Account</h2></div>
            <div className='box'>
              <input id="signup-firstname" type='text' placeholder='First Name'></input>
            </div>
            <div className='box'>
              <input id="signup-lastname" type='text' placeholder='Last Name'></input>
            </div>
            <div className='box'>
              <input id="signup-email" type='email' placeholder='Email'></input>
            </div>
            <div className='box'>
              <input id="signup-mobileno" type='text' placeholder='Mobile No.'></input>
            </div>
            <div className='box'>
              <input id="signup-password" type='password' placeholder='Password'></input>
            </div>
            <div className='box'>
              <button type="reset" className='btn btn-primary rounded-4 resetbutton'>Clear</button>
              <button type="submit" className='btn btn-warning rounded-4 '>Sign Up</button>
            </div>
          </div>
          <p><small>
          Already have an account? <a href='/login'>Sign in</a></small></p>
          <p><small>By creating an account or logging in, you agree to Amazon’s <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=200545940'>Conditions of Use</a> and <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_register_notification_condition_of_use?ie=UTF8&nodeId=200545940'>Privacy Policy</a>.</small></p>
          </div>
        </form>
    </div>
  )
}

export default SignUp