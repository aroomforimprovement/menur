import React, { useState } from 'react';
import { DELIM, OR } from '../../shared/meals';

export const Meal = ({meal, showSpices}) => {
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
        <div>
        <div className='container account-meal border shadow-sm'>
            <div className='row'>
                <div className='col col-12'> {/*onClick={handleClick}>*/}
                    <div className='mealtime-text'>
                        {meal.name ? meal.name  : 'NAME MISSING'}
                    </div>   
                <button type='button' className='btn-close meal-remove' onClick={handleDeleteMeal} 
                    style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} aria-label='Delete'
                >
                </button> 
                <div onClick={handleClick}>
                    {showIngredients 
                    ? <span className='fa fa-angle-up'>{' '}</span> 
                    : <span className='fa fa-angle-down'>{' '}</span>}
                </div>
            </div>
            </div>
        </div>
        <div>
            {showIngredients 
            ? 
            <div>
                <ul className='list-unstyled account-meal-ingredients shadow shadow-lg'>
                    <small>{ingredients}</small>
                </ul>
            </div> 
            : <div></div>
            }
        </div>
        </div>
    );
}