

export const accountReducer = (state, action) => {
    switch(action.type){
        case 'SET_ACCOUNT_INFO':{
            return({...state, 
                userid: action.data.userid,
                username: action.data.username,
                plans: action.data.plans,
                meals: action.data.meals,
                isSet: true    
            })
        }
        case 'SET_SHOW_SPICES':{
            return({...state, showSpices: action.data});
        }
        default:
            break;
    }
}