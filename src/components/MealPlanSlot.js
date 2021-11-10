import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from './MenurRouter';
import { DELIM, OR } from '../shared/meals';

export const MealPlanSlot = ({mealtime, day}) => {
    const { state, dispatch } = useMainContext();

    const [showIngredients, setShowIngredients] = useState(false);


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
    const handleClick = () => {
        setShowIngredients(!showIngredients);
    }
    const ingredients = state.mealplan[day][mealtime].name 
        ? 
        state.mealplan[day][mealtime].ingredients.map((ing) => {
            return(
                <div className='mealplan-ingredients' key={ing.name}>
                    {!state.showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
                </div>
            )
        })
        :
        <div></div>

    return(
        <DropTarget targetKey='meal' as='div'
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className={`container mealtime border shadow shadow-sm ${state.isLandscape ? 'mealtime-ls' : 'mealtime-pt'}`} onClick={handleClick}>
                <div className='mealtime-text'>{state.mealplan[day][mealtime].name 
                    ? state.mealplan[day][mealtime].name  : ' '}
                </div>   
                <button type='button' className='btn-close meal-remove' onClick={handleRemoveMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} aria-label='Remove'
                >
                </button> 
                <div onClick={handleClick}>
                    {showIngredients 
                    ? <span className='fa fa-angle-up'>{' '}</span> 
                    : <span className='fa fa-angle-down'>{' '}</span>}
                </div>
                {showIngredients 
            ? 
            <div>
                <ul className='list-unstyled mealplan-ingredients'>
                    <small>{ingredients}</small>
                </ul>
            </div> 
            : <div></div>}
            </div>
        </DropTarget>
    );
}