import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { refreshTokenSetup } from '../Utility/refreshTokens';
import Dashboard  from './dashboard';
//import axios from 'axios';
const { SetCookie, DeleteCookie, hasCookie } = require('../Utility/CookieManager');
const CLIENT_ID = "110853295632-d5tutra5bb09d26h13ok9jhr39b5s8s4.apps.googleusercontent.com";
const Login = () => {
  
  const [user, setUser] = useState({ haslogin: false, accessToken: '' });
  const onSuccess = (res) => {
    console.log("[login success] current user: ", res.profileObj);
    console.log("complete information: ", res.accessToken);
    refreshTokenSetup(res);
    
  }
  const onFailure = (res) => {
    console.log("[login Failed] current user: ", res);
  }
   const onLogout = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };
  useEffect(() => {
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) {
      setUser({
        ...cookieObject
      });
    }
  }, []);
  function login(response) {
    console.log(response.tokenObj.access_token);
    if (response.accessToken) {
      console.log("implemented this part");
      setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.tokenObj.access_token
      })
    }
    SetCookie({
      ...response.profileObj,
      accessToken: response.tokenObj.access_token
    });
    console.log(user);
  }

  function logout(response) {
    setUser({ haslogin: false, accessToken: '' });
    DeleteCookie(['accessToken', 'email', 'givenName', 'familyName', 'imageUrl', 'name', 'googleId']);
    console.log(user);
  }

  function handleLoginFailure(response) {
    alert('Failed to log in')
  }
  function handleLogoutFailure(response) {
    alert('Failed to log out')
  }
  return (
    
    <div >
      <nav className="navbar navbar-expand-md navbar-light">
                <div className=" w-100 order-1 order-md-0 ">

                </div>
                <div className="mx-auto order-0">
                    <a className="navbar-brand mx-auto" href="/"><p style={{ textDecorationColor: 'black' }}>ABMIENT<b>CARE</b></p></a>
                </div>
                <div className="">
                    {user.haslogin ?
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText='Logout'
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            >
            </GoogleLogout> : <GoogleLogin
              clientId={CLIENT_ID}
              buttonText='Login'
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code,token'
              scope = { 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read'}
            />
          }
                </div>
            </nav>
        
      <Dashboard user={user}/>
      </div>
  );
}

export default Login;
