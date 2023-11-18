// API_user.js

import {apiRoutes } from "../routes";
const url = apiRoutes.url;

export const loginApi = async (username,password) => {

    let respJson;
    let response;
    try{
        response = await fetch(url+"user/validate/", {
            method: 'POST',
            headers : { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ "username" : username, "password" :password}),
        });
        respJson = await response.json();
    }catch (e) {
        throw {status:404,detail:"Cannot communicate with server",instance:"/user/validate/"}
    }
    console.log(response)
    if(response.ok && respJson.error==null)
        return respJson.access_token; //userJwt
    else
        throw respJson;
}

export const getProfileApi = async (username=undefined) => {

    let tmpUser = null ;
    let response;
    try{
        response = await fetch(url+"API/profiles/"+ username);
        tmpUser = await response.json();
    }catch (e) {
        throw {status:404,detail:"Cannot communicate with server",instance:"/API/profiles/{"+username+"}"}
    }


    if(response.ok)
        return tmpUser;
    else
        throw tmpUser;

}
