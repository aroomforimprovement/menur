import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { useMainContext } from './Main';

export const MealPlan = () => {

    const MealPlanSlot = ({mealTime}) => {
        const [meal, setMeal] = useState(null);

        const handleDragEnter = (e) => {
            //
        }    
        const handleDrop = (e) => {
            setMeal(e.dragData);
        }

        return(
            <DropTarget targetKey='meal' 
                onDragEnter={handleDragEnter} onHit={handleDrop}>
            <div className='container'>
                <div >
                    {mealTime}: {meal ? meal.name : null}
                </div>
            </div>
            </DropTarget>
        );
    }


    const Day = ({day}) => {
       return(
            <div className='day'>
                <div className='h5'>{day}</div>
                <MealPlanSlot mealTime="Dinner"/>
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