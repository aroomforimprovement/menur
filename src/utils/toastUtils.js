import React from 'react';
import toast from 'react-hot-toast';
import { ToastConfirm, toastConfirmStyle } from '../common/Toasts/Toasts';
import { saveMeal } from './apiUtils';
import { dontShowAgain } from './userUtils';

export const addMealToast = async ({showBasic, meals, dispatch, meal, day, mealtime, user}) => {

    const setMealAdded = (save) => {
        dispatch({type: 'ADD_MEAL', data: {
            meal: meal, 
            day: day, 
            mealtime: mealtime
        }});
        if(save){
            saveMeal(meal, user, false).then((meal) => {
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
            toast((t) => (
                <ToastConfirm t={t} approve={addAndSaveMeal} approveBtn={'Save to account'}
                  dismiss={addMeal} dismissBtn={`Don't save`} canHide={true}
                  message={`Would you like to save this meal to your account so you can customize it later?`}
                />
                ), toastConfirmStyle())
         }
    }else{
        setMealAdded(false);
    }

}