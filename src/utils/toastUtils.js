import { saveMeal } from './apiUtils';
import toast from 'buttoned-toaster';

export const addMealToast = async ({showBasic, meals, dispatch, meal, day, mealtime, user}) => {

    const setMealAdded = (save) => {
        dispatch({type: 'ADD_MEAL', data: {
            meal: meal, 
            day: day, 
            mealtime: mealtime
        }});
        if(save){
            saveMeal(meal, user, false, toast).then((meal) => {
                dispatch({type: 'ADD_SELECTOR_MEAL', data: meal});
            });
        }
    }
    const addMeal = (t, dontshow) => {
        toast.dismiss(t);
        setMealAdded(false);
    }

    const addAndSaveMeal = (t, dontshow) => {
        toast.dismiss(t);
        setMealAdded(true);
    }

    const hasMeal = (meal) => {
        if(meals && meal.id){
          for(let i = 0; i < meals.length; i++){
            if(meals[i].id && meals[i].id === meal.id){
              return true;
            }
          }
        }
        return false;
    }

    if(showBasic && meals && !hasMeal(meal) && !(meal.name.indexOf('Leftover') > -1)){
        const saveMeal = await toast.dontShow(`SAVE_MEAL_${user.userid}`); 
        if(saveMeal){
            const choice = saveMeal.choice;
            if(choice){
                setMealAdded(true);
            }else{
                setMealAdded(false);
            }
         }else{
            toast.fire(
                {
                    approveFunc: addAndSaveMeal, 
                    approveTxt: 'Save to account',
                    dismissFunc: addMeal,
                    dismissTxt:`Don't save`,
                    canHide: true,
                    dontShowType: `SAVE_MEAL_${user.userid}`,
                    message: `Would you like to save this meal to your account so you can customize it later?`,
                }
            )
         }
    }else{
        setMealAdded(false);
    }
}