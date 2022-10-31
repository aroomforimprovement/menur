import { getNewId } from './objUtils';

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const getAccountInfo = async (user) => {
    const body = {
        userid: user.userid, 
        username: user.username,
        email: user.email
    }
    return await fetch(`${proxy}${apiUrl}app/login`, {
        method: 'GET',
        body: JSON.stringify(body),
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${user.access}`,
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    }).then(response => {
        if(response.ok){
            return response.json();
        }
    }, error => {
        console.error("error fetching account info: ");
        
    }).catch(err => console.error(err))
}

export const saveMeal = async (meal, user, edit, toast) => {
    if(meal.id.length <= 4){
        const stockId = meal.id;
        let newId = getNewId();
        meal.id = newId.replace(newId.substring(0, 4), stockId);
    }
    const body = {
        userid: user.userid,
        meal: meal
    }
    return await fetch(`${proxy}${apiUrl}meal${edit && meal.id ? '/' + meal.id : ''}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${user.access}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok){
            return body.meal;
        }else{
            console.error(`response not ok`);
            toast.error("Error saving the meal");
        }
    }, error => {
        console.error(error);
        return false;
    }).catch((error) => {console.error(error)});
}
