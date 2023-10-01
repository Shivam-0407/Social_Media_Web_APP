import React from 'react'
import { KEY_ACCESS_TOKEN ,getItem} from '../utils/localStorageManager'
import { Outlet,Navigate } from 'react-router-dom'

const RequireUser = () => {
    const user = getItem(KEY_ACCESS_TOKEN)
    return (
      user ? <Outlet />: <Navigate to='/login'></Navigate>
    )
  
}

export default RequireUser