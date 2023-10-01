import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import {Routes,Route} from 'react-router-dom';
import RequireUser from './components/RequireUser';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar'
import OnlyIfNotLoggedIn from './components/OnlyIfNotLoggedIn';
import toast, { Toaster } from 'react-hot-toast';

export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILURE = 'toast_failure'

function App() {

  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const loadingRef = useRef(null);
  
  useEffect(()=>{
    if(isLoading) {
      loadingRef.current?.continuousStart();
    }else{
      loadingRef.current?.complete();
    }
  },[isLoading])

  useEffect(()=>{
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
    
      default:
       
        break;
    }
  },[toastData])

  return (
    <div className='App'>
        <LoadingBar color='#000' ref={loadingRef} />
        <div><Toaster></Toaster></div>
      <Routes>

        <Route element={<RequireUser/>}>
          <Route element={<Home/>}>
            <Route path="" element={<Feed></Feed>}></Route>
            <Route path="/profile/:userId" element={<Profile></Profile>}></Route>
            <Route path="/updateprofile" element={<UpdateProfile/>}></Route>
          </Route>
        </Route>
        <Route element={<OnlyIfNotLoggedIn></OnlyIfNotLoggedIn>}>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Route>
        
        {/* will be put under onlyif not logged in route */}
        
        
      </Routes>

      
    </div>
  );
}

export default App;

// /*protected Route*/ -> pehle jaayega requireUser k pass then jaayega home page par
