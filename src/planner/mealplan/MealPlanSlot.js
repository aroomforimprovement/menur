import React, { useState } from 'react';
import './mealplan.css';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from '../../main/MenurRouter';
import { DELIM, OR } from '../../shared/meals';

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
                <div key={ing.name}>
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
                <div>
                    <div className='mealtime-text pt-0'>{state.mealplan[day][mealtime].name 
                        ? state.mealplan[day][mealtime].name  : ' '}
                    </div>   
                </div>
                <div>
            </div>
            <div className={'row'}> 
                <div hidden={!showIngredients}>
                    <ul className='list-unstyled mealtime-ingredients ms-2 mt-5 col col-12'>
                        <small>{ingredients}</small>
                    </ul>
                </div> 
            </div>
                    <button type='button' className='btn-close meal-remove' onClick={handleRemoveMeal} 
                        style={{ width:'3px', height:'3px', top:'2px', right:'2px', opacity: 0.4, '&:hover': {opacity: 1} }} aria-label='Remove'
                    >
                    </button> 
                    <div onClick={handleClick} className={'expand-ingredients'}>
                        {showIngredients 
                        ? <span className='fa fa-angle-up'>{' '}</span> 
                        : <span className='fa fa-angle-down'>{' '}</span>}
                    </div>
                </div>
                
        </DropTarget>
    );
}