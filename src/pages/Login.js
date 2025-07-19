import axios from 'axios';

function Login() {

  const fetchData = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('email', document.getElementById('login-email').value);
    data.append('password', document.getElementById('login-password').value);
    const response = await axios.post("http://localhost:8000/login-user.php", data, {headers: { 'Content-Type': 'multipart/form-data' }});
    if (response) {
      console.log(response.data);
      if (response) {
  console.log(response.data);
  if(response.data.status === "success") {
    sessionStorage.setItem("login", true);
    localStorage.setItem("name", response.data.data.first_name);
    localStorage.setItem("user_id", response.data.data.user_id);
    window.location.replace("/");  // Redirect to homepage
  }
} else {
  console.log('error');
}

    } else {
        console.log('error');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={fetchData}>
        <div className='Outerbox1'>
          <div className='login-header'><h1>Sign in</h1></div>
          <div className='box'>
            <input id="login-email" type='email' placeholder='Email'></input>
          </div>
          <div className='box'>
            <input id="login-password" type='password' placeholder='Password'></input>
          </div>
          <div className='box'>
            <button className='btn btn-warning w-50 rounded-5' type='submit'>Continue</button>
          </div>
          <p><small>By continuing, you agree to Amazon's <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940'>Conditions of Use</a> and <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">Privacy Notice</a>.</small></p>
        </div>
        <p>New to Amazon? <a href='/signup' >Register</a></p>
      </form>
    </div>
  )
}

export default Login