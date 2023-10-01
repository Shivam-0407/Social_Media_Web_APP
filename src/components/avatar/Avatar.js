import React from 'react'
import  userImg from '../../assets/user_profile.png'
import './Avatar.scss'

function Avatar({src}) {
  return (
    <div className='Avatar'>
        <img src={src? src :userImg} alt='user avatar'></img>
    </div>
  )
}

export default Avatar