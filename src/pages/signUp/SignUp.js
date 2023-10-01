import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient'

import './SignUp.scss'


const SignUp = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

  async function handleSubmit(e){
    
    try{
      e.preventDefault();
      const result = await axiosClient.post('/auth/login',{
        name,
        email,
        password
      });
      console.log(result);
    }catch(e){
      console.log(e);
    }
}



    return (
        <div className='SignUp'>
            <div className='signUpBox'>
                <h2 className='heading'>Sign up</h2>
                <form onsubmit={handleSubmit}>
                    
                    <label htmlFor='name'>Name</label>
                    <input type='name' className='name' id='name' onChange={(e)=>{setName(e.target.value)}}></input>

                    <label htmlFor='email'>Email</label>
                    <input type='email' className='email' id='email' onChange={(e)=>{setEmail(e.target.value)}}></input>
    
                    <label htmlFor='password'>Password</label>
                    <input type='password' className='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                    
                    <input type='submit' className='submit btn' ></input>
                    <p className='subHeading'> Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        </div>
      )
}

export default SignUp