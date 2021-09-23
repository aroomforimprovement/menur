import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { Container } from 'reactstrap';
import { useMainContext } from './Main';

export const MealPlan = () => {

    const MealPlanSlot = ({mealtime}) => {
        const [meal, setMeal] = useState(null);
        const [isSet, setIsSet] = useState(null);
        
        

        const handleDragEnter = (e) => {
            if(!isSet){
                e.target.style.color = 'green';
            }
            e.target.style.fontWeight = 'bold';
        }
        const handleDragLeave = (e) => {
            if(!isSet){
                e.target.style.color = 'black';
                e.target.style.fontWeight = 'normal';
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
                    {mealtime}: {meal ? meal.name : null}
                </div>
            </div>
            </DropTarget>
        );
    }


    const Day = ({day}) => {
       return(
            <div className='day'>
                <div >{day}</div>
                <MealPlanSlot mealtime="Dinner"/>
            </div>
        )

    }

    
    return(
        //just testing a draggable
        <div className='container meal-plan mt-5'>
            <h5 className='meal-plan-heading'>Meal Plan</h5>
            <div className='row'>
                <Day day="Monday" className='col col-1'/>
                <Day day="Tuesday" className='col col-1'/>
                <Day day="Wednesday" className='col col-1'/>
                <Day day="Thursday" className='col col-1'/>
                <Day day="Friday" className='col col-1'/>
                <Day day="Saturday" className='col col-1'/>
                <Day day="Sunday" className='col col-1'/>
            </div>
        </div>
    );

}