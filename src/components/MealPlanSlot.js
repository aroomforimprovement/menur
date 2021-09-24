import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from './Main';

export const MealPlanSlot = ({mealtime, day}) => {
    const [meal, setMeal] = useState(null);
    const [isSet, setIsSet] = useState(null);
    const { dispatch } = useMainContext();


    const handleDragEnter = (e) => {
        if(!isSet){
            e.target.style.color = 'green';
            e.target.style.backgroundColour = 'green';
            e.dragElem.style.color = 'green';
        }
        e.target.style.fontWeight = 'bold';
        //console.log("ENTER");
    }
    const handleDragLeave = (e) => {
        if(!isSet){
            e.target.style.color = 'black';
            e.target.style.fontWeight = 'normal';
            //console.log("LEAVE");
        }
        
    }    
    const handleDrop = (e) => {
        e.dragData.day = day;
        e.dragData.mealtime = mealtime;
        dispatch({type: 'ADD_MEAL', data: e.dragData})
        setMeal(e.dragData)
        setIsSet(true);
        e.target.style.color = 'blue';
    }
    const handleRemoveMeal = () => {
        setMeal(null);
        setIsSet(false);
        dispatch({type: 'REMOVE_MEAL', data: {day: day, mealtime: mealtime}})
    }

    return(
        <DropTarget targetKey='meal' 
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className='container mealtime'>
                <div className='mealtime-text'>{meal ? meal.meal.name : ' '}</div>   
                <span className='fa fa-minus-square-o mealtime-close'
                    onClick={handleRemoveMeal}>{' '}</span> 
            </div>
        </DropTarget>
    );
}