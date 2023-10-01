import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';

function Follower({user}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feedData = useSelector(state=> state.feedDataReducer.feedData)
  const [isFollowing,setFollowing] = useState();


  function handleUserFollow(){
    dispatch(followAndUnfollowUser({
      userIdToFollow:user._id
    }))
  }

  useEffect(()=>{
    // if(feedData.followings.find(item => item.id === user._id)){
    //   setFollowing(true);
    // }else{
    //   setFollowing(false)
    // }
    setFollowing(feedData.followings.find(item => item._id === user._id))
  },[feedData])
  return (
    <div className='Follower'>
      <div className='user-info' onClick={()=> navigate(`/profile/${user._id}`)}>
        <Avatar src={user?.avatar?.url}/>
        <h4 className='name'>{user?.name}</h4>
      </div>
       
        <h5 onClick={handleUserFollow} className={isFollowing? 'hover-link follow-link' :'btn-primary'}>{isFollowing?'Unfollow':'Follow'}</h5>
    </div>
  )
}

export default Follower