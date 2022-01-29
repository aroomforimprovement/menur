import React from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { MealPlan } from '../../../planner/mealplan/MealPlan';
import { MealtimePicker } from './MealtimePicker';


export const MealPlanFull = () => {
   
    const { state, dispatch } = useMainContext();

    return(
        <div>
            <div hidden={!state.isMealtimePickerClosed}>
                <MealPlan />
            </div>
            <div hidden={state.isMealtimePickerClosed}>
                <MealtimePicker />
            </div>
        </div>
    )
}