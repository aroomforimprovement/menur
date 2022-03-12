import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const saveMeal = async (meal, user, edit) => {
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