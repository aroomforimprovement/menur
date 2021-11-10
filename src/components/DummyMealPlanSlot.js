import React, { useState } from 'react';
import { DELIM, OR } from '../shared/meals';

export const DummyMealPlanSlot = ({mealplan ,mealtime, day, isLandscape}) => {

    const [showIngredients, setShowIngredients] = useState(false);
   
    
    const handleClick = () => {
        setShowIngredients(!showIngredients);
    }
    const ingredients = mealplan[day][mealtime].name 
        ? 
        mealplan[day][mealtime].ingredients.map((ing) => {
            return(
                <div className='dummy-plan-ing' key={ing.name}>
                    <li >{ing.name.replaceAll(DELIM, OR)}</li>
                </div>
            )
        })
        :
        <div></div>

    return(
        <div >                
            <div className={`container dummy-plan-meal border shadow shadow-sm`} onClick={handleClick}>
                <div className={'name'}>{mealplan[day][mealtime].name 
                    ? mealplan[day][mealtime].name  : ' '}
                </div>
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
                <ul className='list-unstyled'>
                    <small>{ingredients}</small>
                </ul>
            </div> 
            : <div></div>}
        </div>
    );
}