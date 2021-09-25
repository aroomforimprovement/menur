import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from './Main';
import { DELIM, OR } from '../shared/meals';

export const MealPlanSlot = ({mealtime, day}) => {
    const { state, dispatch } = useMainContext();
     const [isSet, setIsSet] = useState(state.mealplan[day][mealtime].name 
        ? true : false );
    const [showIngredients, setShowIngredients] = useState(false);
    


    const handleDragEnter = (e) => {
        if(!isSet){
            e.target.style.color = 'green';
            e.target.style.backgroundColour = 'green';
            e.dragElem.style.color = 'green';
        }
        e.target.style.color = 'red';
        //console.log("ENTER");
    }
    const handleDragLeave = (e) => {
        if(!isSet){
            e.target.style.color = 'black';
            //console.log("LEAVE");
        }else{
            e.target.style.color = 'blue';
            e.target.style.fontWeight = 'bold';
        }
        
    }    
    const handleDrop = (e) => {
        e.dragData.day = day;
        e.dragData.mealtime = mealtime;
        dispatch({type: 'ADD_MEAL', data: e.dragData})
        setIsSet(true);
        e.target.style.color = 'blue';
        e.target.style.fontWeight = 'bold';
        window.localStorage.setItem("MENUR_STATE", JSON.stringify(state));
    }
    const handleRemoveMeal = () => {
        setIsSet(false);
        dispatch({type: 'REMOVE_MEAL', data: {day: day, mealtime: mealtime}});
        window.localStorage.setItem("MENUR_STATE", JSON.stringify(state));
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
        <DropTarget targetKey='meal' 
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className='container mealtime' onClick={handleClick}>
                <div className='mealtime-text'>{state.mealplan[day][mealtime].name 
        ? state.mealplan[day][mealtime].name  : ' '}</div>   
                <span className='fa fa-minus-square-o mealtime-close'
                    onClick={handleRemoveMeal}>{' '}</span> 
            </div>
            {
            showIngredients 
            ? 
            <div>
                <ul className='list-unstyled sugg-ingredients'>
                    <small>{ingredients}</small>
                </ul>
            </div> 
            : <div></div>}
        </DropTarget>
    );
}