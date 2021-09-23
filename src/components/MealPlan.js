import React, { useState } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { Card } from 'reactstrap';
import { Container } from 'reactstrap';
import { useMainContext } from './Main';

export const MealPlan = () => {

    const MealPlanSlot = () => {
        const [meal, setMeal] = useState(null);
        const [isSet, setIsSet] = useState(null);
        
        

        const handleDragEnter = (e) => {
            if(!isSet){
                e.target.style.color = 'green';
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


    return(
        <table class="table">
            <thead>
                <th scope='col'>#</th>
                <th scope='col'>Monday</th>
                <th scope='col'>Tuesday</th>
                <th scope='col'>Wednesday</th>
                <th scope='col'>Thursday</th>
                <th scope='col'>Friday</th>
                <th scope='col'>Saturday</th>
                <th scope='col'>Sunday</th>
            </thead>
            <tbody>
                <tr>
                    <th scope='row'>Dinner</th>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                </tr>
                <tr>
                    <th scope='row'>Lunch</th>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                </tr>
                <tr>
                    <th scope='row'>Breakfast</th>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                    <td><MealPlanSlot /></td>
                </tr>
            </tbody>
        </table>
    )
    /**
    return(
        //just testing a draggable
        <div className='container col-2 mt-5 ms-0'>
            <div className='meal-plan'>
                <div className='row'>
                <h5 className='meal-plan-heading'>Meal Plan</h5>
                </div>
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
        </div>
    );
 */
}