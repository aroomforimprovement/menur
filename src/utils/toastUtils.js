import React from 'react';
import toast from 'react-hot-toast';
import { ToastConfirm, toastConfirmStyle } from '../common/Toasts/Toasts';
import { saveMeal } from './apiUtils';

export const addMealToast = ({showBasic, meals, dispatch, meal, day, mealtime, user}) => {

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

    const addMeal = (t) => {
        toast.dismiss(t);
        setMealAdded(false);
    }

    const addAndSaveMeal = (t) => {
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

    showBasic && meals 
        && !window.localStorage.getItem(`dontshow_SAVE_MEAL`) 
        && !hasMeal(meal)
    ? toast((t) => (
        <ToastConfirm t={t} approve={addAndSaveMeal} approveBtn={'Save to account'}
          dismiss={addMeal} dismissBtn={`Don't save`}
          message={`Would you like to save this meal to your account so you can customize it later?`}
        />
        ), toastConfirmStyle())
        : addMeal(); 

}