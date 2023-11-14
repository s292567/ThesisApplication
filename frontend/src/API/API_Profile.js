const url = 'http://localhost:8081/';

async function getProfile(username=undefined){

    let tmpUser = null ;
    let response;
    try{
        response = await fetch(url+"API/profiles/"+username);
        tmpUser = await response.json();
    }catch (e) {
        throw {status:404,detail:"Cannot communicate with server",instance:"/API/profiles/{"+username+"}"}
    }


    if(response.ok)
        return tmpUser;
    else
        throw tmpUser;

}
export default {getProfile}