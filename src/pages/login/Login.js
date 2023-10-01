import React, { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import {axiosClient} from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem,getItem } from '../../utils/localStorageManager';



function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try{
      
      const response = await axiosClient.post('/auth/login',{
        email,
        password
      });
      setItem(KEY_ACCESS_TOKEN,response.result.accessToken); // yaha dikkat ho sakti hai 
      navigate('/');
      console.log(response);
      console.log("KEY_ACCESS_TOKEN :", KEY_ACCESS_TOKEN);

      // console.log(getItem(KEY_ACCESS_TOKEN));

      console.log("localStorage = "+localStorage);

      console.log("result.accessToken: " + response.result.accessToken);
    }catch(e){
      console.log(e);
     }
  }

  


  return (
    <div className='Login'>
        <div className='loginBox'>
            <h2 className='heading'>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='email' className='email' id='email' onChange={(e)=>{setEmail(e.target.value)}}></input>

                <label htmlFor='password'>Password</label>
                <input type='password' className='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                
                <input type='submit' className='submit btn' onSubmit={handleSubmit} value="Submit"></input>
                <p className='subHeading'> Do not have an account? <Link to='/signup'>SignUp</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login