import { saveMeal } from './apiUtils';
import { dontShowAgain } from './userUtils';

export const addMealToast = async ({showBasic, meals, dispatch, meal, day, mealtime, user}, toast) => {

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
        captureDontShow(dontshow, false);
    }

    const addAndSaveMeal = (t, dontshow) => {
        toast.dismiss(t);
        setMealAdded(true);
        captureDontShow(dontshow, true);
    }

    const captureDontShow = (dontshow, choice) => {
        dontshow ? dontShowAgain('SAVE_MEAL', choice) : console.log();
    }
    const hasMeal = (meal) => {
        if(meals && meal.id){
          for(let i = 0; i < meals.length; i++){
              //console.log(meals[i].id+"\n"+meal.id+"\n");
            if(meals[i].id && meals[i].id === meal.id){
              return true;
            }
          }
        }
        return false;
    }

    if(showBasic && meals && !hasMeal(meal)){
         if(window.localStorage.getItem(`dontshow_SAVE_MEAL`)){
            const choice = await JSON.parse(window.localStorage.getItem(`dontshow_SAVE_MEAL`)).choice;
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
                    dontShowType: 'SAVE_MEAL',
                    message: `Would you like to save this meal to your account so you can customize it later?`,
                }
            )
         }
    }else{
        setMealAdded(false);
    }

}