import React, { useEffect, useState } from 'react';
import './mealplan.scss';
import { DropTarget, DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from '../../main/MenurRouter';
import { MealPlanSlotIngredient } from './MealPlanSlotIngredient';
import toast from 'buttoned-toaster';
import { saveMeal } from '../../utils/apiUtils';

export const MealPlanSlot = ({mealtime, day}) => {
    const { state, dispatch } = useMainContext();
    //const [showIngredients, setShowIngredients] = useState(false);
    const [hasHighlightedIngredient, setHasHighlightedIngredient] = useState(false);
    
    useEffect(() => {
        const ings = state.mealplan[day][mealtime].ingredients 
            ? [...state.mealplan[day][mealtime].ingredients]
            : [];
        let hasHighlight = false;
        for(let i = 0; i < ings.length; i++){
            if(state.highlightedIngredient === ings[i].name){
                hasHighlight = true;
                break;
            }
        }
        setHasHighlightedIngredient(hasHighlight);
    }, [day, mealtime, state.highlightedIngredient, state.mealplan]);

    const handleDragEnter = (e) => {
        e.target.style.color = 'red';
    }
    const handleDragLeave = (e) => {
        e.target.style.color = 'darkblue';
    }    

    const addMealToast = async (
        {
            showBasic, 
            meals, 
            meal, 
            day, 
            mealtime, 
            user
        }) => {
    
        const setMealAdded = (save) => {
            dispatch({
                type: 'ADD_MEAL', 
                data: {
                    meal: meal, 
                    day: day, 
                    mealtime: mealtime
                }
            });
            if(save){
                dispatch({type: 'ADD_SELECTOR_MEAL', data: meal});
                saveMeal(meal, user, false, toast).then((meal) => {
                    
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

    const handleDrop = (e) => {
        addMealToast({
            showBasic: state.showBasic,
            meals: state.meals,
            dispatch: dispatch,
            meal: e.dragData.meal,
            day: day,
            mealtime: mealtime,
            user: state.user
        })
    }

    const handleDropOver = (e) => {
        handleRemoveMeal();
    }

    const handleRemoveMeal = () => {
        dispatch({type: 'REMOVE_MEAL', data: {day: day, mealtime: mealtime}});
    }

    const toggleShowIngredients = () => {
        dispatch({type: 'SET_MEALPLAN_INGS_OPEN',
            data: {
                day: day, 
                mealtime: mealtime, 
                showIngredients: !state.mealplan[day][mealtime].showIngredients
            }
        });
        //setShowIngredients(!showIngredients);
    }
    
    const setMealtimePickerOpen = () => {
        dispatch({
            type: 'SET_MEALTIME_PICKER_CLOSED', 
            data: {
                isMealtimePickerClosed: false,
                mealtimePickerDay: day,
                mealtimePickerMealtime: mealtime
            }
        });
    }

    const ingredients = state.mealplan[day][mealtime].name 
        ? 
        state.mealplan[day][mealtime].ingredients.map((ing) => {
            return(
                <div key={ing.name}>
                    <MealPlanSlotIngredient
                        day={day} mealtime={mealtime} ing={ing}/>
                   {/* {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}*/}
                </div>
            )
        })
        :
        <div></div>
    
    let classes = '';
    classes = state.mealplan[day][mealtime].showIngredients ? 'fa-angle-up' : 'fa-angle-down';
    
    return(
        <DropTarget 
            as='div'     
            targetKey='meal' 
            onDragEnter={handleDragEnter} 
            onDragLeave={handleDragLeave} 
            onHit={handleDrop}>                
            <div className={`mealtime border shadow shadow-sm ${state.isLandscape ? 'mealtime-ls' : 'mealtime-pt'} 
                ${hasHighlightedIngredient ? 'border-success' : ''}`} >
                <div 
                    className='mealtime-click fa fa-edit'
                    onClick={setMealtimePickerOpen} ></div>
                <DragDropContainer 
                    targetKey='meal' 
                    onDrop={handleDropOver} 
                    dragData={{meal: state.mealplan[day][mealtime]}}>
                    <div className='mealtime-text'>
                        {state.mealplan[day][mealtime].name 
                        ? state.mealplan[day][mealtime].name  
                        : ' '}
                    </div>
                </DragDropContainer>
                
                <div>
            </div>
            <div className={'row'}> 
                <div hidden={!state.mealplan[day][mealtime].showIngredients}>
                    <ul className='list-unstyled mealtime-ingredients mx-0 px-0 mt-5 col col-12'>
                        <small>{ingredients}</small>
                    </ul>
                </div>
            </div>
                <button type='button' className='btn-close meal-remove' onClick={handleRemoveMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px', opacity: 0.4, '&:hover': {opacity: 1} }} aria-label='Remove'
                >
                </button>                
                <div onClick={toggleShowIngredients} className={'expand-ingredients'}>
                    <span className={`fa ${classes}`}>{' '}</span> 
                </div>
            </div>
        </DropTarget>
    );
}