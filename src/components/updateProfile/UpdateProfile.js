import React, { useEffect, useState } from 'react'
import dummyUserImg from '../../assets/user_profile.png'

import './UpdateProfile.scss'
import { useSelector,useDispatch } from 'react-redux'
import { updateMyProfile } from '../../redux/slices/appConfigSlice'

function UpdateProfile() {
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const [name,setName] = useState('');
    const [bio,setBio] = useState('');
    const [userImg,setuserImg] = useState('');
    const dispatch = useDispatch();
    useEffect(() =>{
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setuserImg(myProfile?.avatar?.url || '');
    },[myProfile])
    

    function handleImageChange(e){
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () =>{
            if(fileReader.readyState === fileReader.DONE){
                setuserImg(fileReader.result);
                
                //image ka base-64 encoded data hai console me
                //console.log(' image data = ',fileReader.result)
            }
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(updateMyProfile({
            name,
            bio,
            userImg
        }))
    }
  return (
    <div className='UpdateProfile'>
        <div className='container'>
            <div className='left-part'>
                <div className='input-user-img'>
                    <label htmlFor='inputImg' className='labelImg'> <img src={userImg ? userImg:dummyUserImg} alt={name}></img></label>
                    <input className='inputImg' id='inputImg' type='file' accept='image/*' onChange={handleImageChange}></input>
                </div>
            </div>
            <div className='right-part'>
                <form onClick={handleSubmit}>
                    <input type='text'value={name} placeholder='Your Name' onChange={(e)=>{setName(e.target.value)}}></input>
                    <input type='text'value={bio} placeholder='Your Bio'onChange={(e)=>{setBio(e.target.value)}}></input>
                    <input type='submit' className='btn-primary' onClick={handleSubmit}></input>
                </form>

                <button className='delete-account btn-primary'> Delte Account</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile