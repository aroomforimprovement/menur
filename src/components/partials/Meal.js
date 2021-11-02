import React, { useState } from 'react';
import { useAccountContext } from '../Account';
import { DELIM, OR } from '../../shared/meals';

export const Meal = ({meal, showSpices}) => {
    //const { account } = useAccountContext();
    const [showIngredients, setShowIngredients] = useState(false);

    const handleClick = () => {
        setShowIngredients(!showIngredients);
    }

    const handleDeleteMeal = () => {
        console.error("handleDeleteMeal not implemented");
    }

    const ingredients = meal.name 
        ? 
        meal.ingredients.map((ing) => {
            return(
                <div className='mealplan-ingredients' key={ing.name}>
                    {!showSpices && (ing.type === 'spice' || ing.type === 'cond') ? <div></div> : <li >{ing.name.replaceAll(DELIM, OR)}</li>}
                </div>
            )
        })
        :
        <div></div>

    return(
        <div className='container account-meal'>
            <div className='row account-meal-view'>
            <div className='container suggestion border shadow-sm' onClick={handleClick}>
                <div className='mealtime-text'>{meal.name 
                    ? meal.name  : 'NAME MISSING'}
                </div>   
                <button type='button' className='btn-close meal-remove' onClick={handleDeleteMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} aria-label='Remove'
                >
                </button> 
                <div onClick={handleClick}>
                    {showIngredients 
                    ? <span className='fa fa-angle-up'>{' '}</span> 
                    : <span className='fa fa-angle-down'>{' '}</span>}
                </div>
            </div>
            {
            showIngredients 
            ? 
            <div>
                <ul className='list-unstyled mealplan-ingredients'>
                    <small>{ingredients}</small>
                </ul>
            </div> 
            : <div></div>}
            </div>
        </div>
    );
}