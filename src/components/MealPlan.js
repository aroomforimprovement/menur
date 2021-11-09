import React from 'react';
import { MealPlanSlot } from './MealPlanSlot';
import { Leftovers } from './Leftovers.js';
import { useMainContext } from './MenurRouter';

export const MealPlan = () => {

    const { state, dispatch } = useMainContext();

    const toggleOrientation = () => {
        dispatch({type: 'SET_IS_LANDSCAPE', data: !state.isLandscape})
    }
    const PortraitMealPlan = () => {
        return(
            <div className='shadow-lg border border-info mt-3 col col-12'>
                <table className="table col col-1">
                    <thead >
                        <tr >
                            <th scope='col' className='col col-1 mealtime-header-pt'>#</th>
                            <th scope='col' className='mealtime-header-pt'>Breakfast</th>
                            <th scope='col' className='mealtime-header-pt'>Lunch</th>
                            <th scope='col' className='mealtime-header-pt'>Dinner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Monday</th>
                            <td ><MealPlanSlot mealtime={"Breakfast"} day={"Monday"}/></td>
                            <td ><MealPlanSlot mealtime={"Lunch"} day={"Monday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Monday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Tuesday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Tuesday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Wednesday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Wednesday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Thursday</th>
                            <td ><MealPlanSlot mealtime={"Breakfast"} day={"Thursday"}/></td>
                            <td ><MealPlanSlot mealtime={"Lunch"} day={"Thursday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Thursday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Friday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Friday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Saturday</th>
                            <td><MealPlanSlot mealtime={"Breakfast"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Dinner"} day={"Saturday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-header-pt'>Sunday</th>
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
                            <th scope='col' className='col col-1 mealtime-header-ls'>#</th>
                            <th scope='col' className='mealtime-header-ls'>Monday</th>
                            <th scope='col' className='mealtime-header-ls'>Tuesday</th>
                            <th scope='col' className='mealtime-header-ls'>Wednesday</th>
                            <th scope='col' className='mealtime-header-ls'>Thursday</th>
                            <th scope='col' className='mealtime-header-ls'>Friday</th>
                            <th scope='col' className='mealtime-header-ls'>Saturday</th>
                            <th scope='col' className='mealtime-header-ls'>Sunday</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row' className='mealtime-ls'>Dinner</th>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Monday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Tuesday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Wednesday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Thursday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Friday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Saturday"}/></td>
                            <td ><MealPlanSlot mealtime={"Dinner"} day={"Sunday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-ls'>Lunch</th>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Monday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Tuesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Wednesday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Thursday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Friday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Saturday"}/></td>
                            <td><MealPlanSlot mealtime={"Lunch"} day={"Sunday"}/></td>
                        </tr>
                        <tr>
                            <th scope='row' className='mealtime-ls'>Breakfast</th>
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
        <div className={`mealplan-${state.isLandscape ? 'ls' : 'pt'}`}>
            <button onClick={toggleOrientation} className={`mt-4 py-2 px-3 border shadow ${state.isLandscape ? 'toggle-orientation-ls' : 'toggle-orientation-pt'}`}>{state.isLandscape ? "[ || ] " : "[ = ] "} Toggle Orientation</button>
            {
                state.isLandscape ? <LandscapeMealPlan /> : <PortraitMealPlan />
            }
        </div>
    );
}