import axios from 'axios';
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStorageManager';
import store from '../redux/store'
import { setLoading, showToast } from '../redux/slices/appConfigSlice';
import { TOAST_FAILURE } from '../App';
// import { error } from '../../../server/utils/responseWrapper';

let baseURL='http://localhost:4000/';
console.log(`env is : ${process.env.NODE_ENV}`);
 
if(process.env.NODE_ENV === 'production'){
    baseURL=process.env.REACT_APP_SERVER_BASE_URL
}
export const axiosClient = axios.create({
    baseURL,
    withCredentials:true // used for sending cookie from fromtend to backend so that hum refresh token access kar paaye cookies se
})

axiosClient.interceptors.request.use(
    (request)=>{
        const access_token = getItem(KEY_ACCESS_TOKEN);

        //console.log('request interceptors token ='+access_token);

        request.headers['Authorization'] = `Bearer ${access_token}`; //yaha hum authorizaton header bhej rahe hai
        store.dispatch(setLoading(true));

        return request;  // ab hume khud se kisi bhee request me authorization header bhejne kee zaroorat nahee hai
    }
    // (error)=>{

    // }
);



axiosClient.interceptors.response.use(
   
     async (response)=>{
        store.dispatch(setLoading(false))
        const data = response.data; //ye hum axios object se uthaa rhae hai(response.data)
        if(data.status === 'ok'){
            //console.log(response);
            return data;
        }


        
        console.log(" response interceptor ",response);
        const originalRequest = response.config; //this gives the original request
        const statusCode = data.statusCode;
        const error = data.message;

        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error
        }))

        if(statusCode === 401 && !originalRequest._retry){
            //means access token expired
            originalRequest._retry = true;

            const response = await axios.create({
                withCredentials:true,
            }).get(`${baseURL}/auth/refresh`)
            
            console.log('response  from backend', response);

            if(response.data.status === 'ok'){ //agar hamara refresh token expire nahee huaa
                setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`

                return axios(originalRequest);
            }else{ // // when refresh token expires, send user to login page

                removeItem(KEY_ACCESS_TOKEN); // removing the access token 
                window.location.replace('/login','_self'); // browser k tareeke se bhej rahe hai normal react k tareke se nahee
    
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
    async (error)=>{
        store.dispatch(setLoading(false))
        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error.message
        }))
        return Promise.reject(error);
         //hum error bhej hee nahee rahe hai hum hamare send object me hee status bhejrahe hai
    }
);