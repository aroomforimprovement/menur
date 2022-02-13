import React, { useEffect, useState } from 'react';
import './mealplan.scss';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from '../../main/MenurRouter';
import { MealPlanSlotIngredient } from './MealPlanSlotIngredient';

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
    const handleDrop = (e) => {
        e.dragData.day = day;
        e.dragData.mealtime = mealtime;
        dispatch({type: 'ADD_MEAL', data: e.dragData});
        e.target.style.color = 'blue';
        e.target.style.fontWeight = 'bold';
    }
    const handleRemoveMeal = () => {
        dispatch({type: 'REMOVE_MEAL', data: {day: day, mealtime: mealtime}});
    }
    const toggleShowIngredients = () => {
        dispatch({type: 'SET_MEALPLAN_INGS_OPEN',
            data: {day: day, mealtime: mealtime, showIngredients: !state.mealplan[day][mealtime].showIngredients}});
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
        <DropTarget targetKey='meal' as='div'
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className={`mealtime border shadow shadow-sm ${state.isLandscape ? 'mealtime-ls' : 'mealtime-pt'} 
                ${hasHighlightedIngredient ? 'border-success' : ''}`} >
                <div onClick={setMealtimePickerOpen} className='mealtime-click'>
                    <div className='mealtime-text'>{state.mealplan[day][mealtime].name 
                        ? state.mealplan[day][mealtime].name  : ' '}
                    </div>   
                </div>
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