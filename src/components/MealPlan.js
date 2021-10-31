import React from 'react';
import { MealPlanSlot } from './MealPlanSlot';
import { Leftovers } from './Leftovers.js';
import { useMainContext } from './Main';

export const MealPlan = () => {

    const { state, dispatch } = useMainContext();

    const toggleOrientation = () => {
        dispatch({type: 'SET_IS_LANDSCAPE', data: !state.isLandscape})
    }
    const PortraitMealPlan = () => {
        return(
            <div className='shadow-lg border border-info mt-3 col col-12'>
                <table className="table col col-1">
                    <thead className='col col-1'>
                        <tr >
                            <th scope='col' className='col col-1'>#</th>
                            <th scope='col'>Breakfast</th>
                            <th scope='col'>Lunch</th>
                            <th scope='col'>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>Monday</th>
                            <td ><MealPlanSlot mealtime={"Breakfast"} day={"Monday"}/></td>
                            <td ><MealPlanSlot mealtime={"Lunch"} day={"Monday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Monday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Tuesday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Tuesday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Wednesday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Wednesday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Thursday</th>
                            <td ><MealPlanSlot mealtime={"Breakfast"} day={"Thursday"}/></td>
                            <td ><MealPlanSlot mealtime={"Lunch"} day={"Thursday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Thursday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Friday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Friday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Saturday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Saturday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Sunday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Sunday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Sunday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Sunday"}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className='leftover-col col col-12 ms-2'>
                    <h5 >Leftovers: </h5>
                    <Leftovers />
                </div>
            </div>
        );
    }

    const LandscapeMealPlan = () => {
        return(
            <div className='shadow-lg border border-info mt-3 col col-12'>
                <table className="table col col-1">
                    <thead className='col col-1'>
                        <tr >
                            <th scope='col' className='col col-1'>#</th>
                            <th scope='col'>Monday</th>
                            <th scope='col'>Tuesday</th>
                            <th scope='col'>Wednesday</th>
                            <th scope='col'>Thursday</th>
                            <th scope='col'>Friday</th>
                            <th scope='col'>Saturday</th>
                            <th scope='col'>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>Dinner</th>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Monday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Tuesday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Wednesday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Thursday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Friday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Saturday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Sunday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Lunch</th>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Monday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Thursday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Sunday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row'>Breakfast</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Monday"}/></td>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Thursday"}/></td>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Sunday"}/></td>
                        </tr>
                        
                    </tbody>
                </table>
                <div className='leftover-col col col-12 ms-2'>
                    <h5 >Leftovers: </h5>
                    <Leftovers />
                </div>
            </div>
        );
    }
    
    return(
        
        <div>
            <button onClick={toggleOrientation} className='btn btn-sm mt-4 btn-warning border border-success'>{state.isLandscape ? "[ || ] " : "[ = ] "} Toggle Orientation</button>
            {
                state.isLandscape ? <LandscapeMealPlan /> : <PortraitMealPlan />
            }
        </div>
        
    );
}