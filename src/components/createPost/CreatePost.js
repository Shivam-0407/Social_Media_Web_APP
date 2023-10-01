import React, { useState } from 'react'
import './CreatePost.scss';
import nature_image from '../../assets/nature_image.jpg';
import Avatar from '../avatar/Avatar';
import {BsCardImage} from 'react-icons/bs'
import { axiosClient } from '../../utils/axiosClient';
import { useDispatch,useSelector } from 'react-redux';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { getUserProfile } from '../../redux/slices/postSlice';

function CreatePost() {
    const [postImg,setPostImg] = useState('');
    const [caption,setCaption] = useState('');
    const dispatch = useDispatch();
    const myProfile = useSelector(state=>state.appConfigReducer.myProfile);
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () =>{
            if(fileReader.readyState === fileReader.DONE){
                setPostImg(fileReader.result);
                
                //image ka base-64 encoded data hai console me
                //console.log(' image data = ',fileReader.result)
            }
        }
    }

    const handlePostSubmit = async (e)=>{
        try {
           
            const result = await axiosClient.post('/posts',{
                caption,
                postImg
               });
               console.log("Create post axios result",result);
               dispatch(getUserProfile({
                userId:myProfile?._id
               }));
        } catch (error) {
            
        }finally{
           
            setCaption("");
            setPostImg("");
        }
       
    }
  return (
    <div className='CreatePost'>
        <div className='left-part'>
            <Avatar src={myProfile?.avatar?.url}></Avatar>
        </div>
        <div className='right-part'>
            <input value={caption} type='text' className='captionInput' placeholder="What's on your mind 😎 ?" onChange={(e)=>{setCaption(e.target.value)}}></input>
            {postImg && (
            <div className='img-container'>
                <img className='post-img ' src={postImg} alt='post-img'></img>
            </div>
            )}
            <div className='bottom-part'>
                <div className='input-post-img'>
                        <label htmlFor='inputImg' className='labelImg'> <BsCardImage></BsCardImage> </label>
                        <input className='inputImg' id='inputImg' type='file' accept='image/*' onChange={handleImageChange}></input>
                </div>
                <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost