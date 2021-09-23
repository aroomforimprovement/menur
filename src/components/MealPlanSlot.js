import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';

export const MealPlanSlot = () => {
    const [meal, setMeal] = useState(null);
    const [isSet, setIsSet] = useState(null);
    
    

    const handleDragEnter = (e) => {
        if(!isSet){
            e.target.style.color = 'green';
            e.target.div.style.backgroundColour = 'green';
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
        setMeal(e.dragData);
        setIsSet(true);
        e.target.style.color = 'blue';
    }

    return(
        <DropTarget targetKey='meal' 
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className='container'>
                <div className='mealtime'>
                    {meal ? meal.name : ' '}
                </div>
            </div>
        </DropTarget>
    );
}