import React, { useState } from 'react';
import { useMainContext } from './Main';

export const MealPlan = () => {

    const MealPlanSlot = ({mealTime}) => {
        const [meal, setMeal] = useState(null);

        const handleDragOver = (e) => {
            e.preventDefault();
            //e.dataTransfer.dropEffect = prop.dropEffect
        } 
        const handleDragEnter = (e) => {
            //e.dataTransfer.dropEffect = props.dropEffect;
        }    
        const handleDrop = (e) => {
            //something
            console.log("DROP");
            console.dir(e.dataTransfer.getData("drag-item"));
            setMeal(JSON.parse(e.dataTransfer.getData("drag-item")));
        }

        return(
            <div className='container'>
                <div onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop}>
                    {mealTime}: {meal ? meal.name : null}
                </div>
            </div>
        );
    }


    const Day = ({day}) => {
       return(
            <div className='container'>
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
                <Day day="Monday" className='day col col-1'/>
                <Day day="Tuesday" className='day col col-1'/>
                <Day day="Wednesday" className='day col col-1'/>
                <Day day="Thursday" className='day col col-1'/>
                <Day day="Friday" className='day col col-1'/>
                <Day day="Saturday" className='day col col-1'/>
                <Day day="Sunday" className='day col col-1'/>
            </div>
        </div>
    );

}