import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from './Main';

export const MealPlanSlot = ({mealtime, day}) => {
    const [meal, setMeal] = useState(null);
    const [isSet, setIsSet] = useState(null);
    const { state, dispatch } = useMainContext();


    const handleDragEnter = (e) => {
        if(!isSet){
            e.target.style.color = 'green';
            e.target.style.backgroundColour = 'green';
            e.dragElem.style.color = 'green';
        }
        e.target.style.fontWeight = 'bold';
        console.log("ENTER");
    }
    const handleDragLeave = (e) => {
        if(!isSet){
            e.target.style.color = 'black';
            e.target.style.fontWeight = 'normal';
            console.log("LEAVE");
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

    return(
        <DropTarget targetKey='meal' 
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className='container'>
                <div className='mealtime'>
                    {meal ? meal.meal.name : ' '}
                </div>
            </div>
        </DropTarget>
    );
}