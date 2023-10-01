import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStorageManager'
import { Outlet,Navigate } from 'react-router-dom'

function OnlyIfNotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN)
  return (
    user ? <Navigate to='/'></Navigate> :<Outlet />
  )
}

export default OnlyIfNotLoggedIn