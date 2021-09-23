import React, { useState } from 'react';
import { useMainContext } from './Main';
import { MealPlanSlot } from './MealPlanSlot';


export const MealPlan = () => {

    const leftovers = () => {
        return(
            <div>Placeholder</div>
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
                <tr>
                    <th>
                        Leftovers:
                    </th>
                    <tr>
                        {leftovers}
                    </tr>
                </tr>
            </tbody>
        </table>
    )
 
}