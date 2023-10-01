export const KEY_ACCESS_TOKEN = 'access_token'; //ye access token kee key hai

export function getItem(key){ // jab check karna hai kee banda login hai kee nahee hai
    return localStorage.getItem(key); //ye ek document objct hota hai jiski madad se hum website se local storage ko access kar sakte hai
}

export function setItem(key,value){
    localStorage.setItem(key,value); // will be called when we've logged in & we're saving access token
}

export function removeItem(key){
    localStorage.removeItem(key); // will be called when we're logging out
}