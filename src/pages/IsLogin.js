function IsLogin() {
  const isLogin=sessionStorage.getItem("login")
  if(!isLogin || isLogin===null){
    window.location.replace('/login')
  }
}

export default IsLogin

