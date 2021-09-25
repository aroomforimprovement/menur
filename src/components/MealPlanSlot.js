import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from './Main';

export const MealPlanSlot = ({mealtime, day}) => {
    const { state, dispatch } = useMainContext();
    const [meal, setMeal] = useState(state.mealplan[day][mealtime].name 
        ? state.mealplan[day][mealtime] : null);
    const [isSet, setIsSet] = useState(state.mealplan[day][mealtime].name 
        ? true : false );
    


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
        window.localStorage.setItem("MENUR_STATE", JSON.stringify(state));
    }
    const handleRemoveMeal = () => {
        setMeal(null);
        setIsSet(false);
        dispatch({type: 'REMOVE_MEAL', data: {day: day, mealtime: mealtime}});
        window.localStorage.setItem("MENUR_STATE", JSON.stringify(state));
        console.log("MENUR_STATE");
        console.dir(window.localStorage.getItem('MENUR_STATE'));
    }
    
    return(
        <DropTarget targetKey='meal' 
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onHit={handleDrop}>                
            <div className='container mealtime'>
                <div className='mealtime-text'>{state.mealplan[day][mealtime].name 
        ? state.mealplan[day][mealtime].name  : ' '}</div>   
                <span className='fa fa-minus-square-o mealtime-close'
                    onClick={handleRemoveMeal}>{' '}</span> 
            </div>
        </DropTarget>
    );
}