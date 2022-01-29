import React, { useState } from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { Selector } from '../../../planner/selector/Selector';
import { MealGen } from '../../../planner/suggestions/mealgen/MealGen';
import { Suggestions } from '../../../planner/suggestions/Suggestions';
import { days, mealtimes } from '../../../shared/states';

export const MealtimePicker = () => {
    const { state, dispatch } = useMainContext();

    return(
        <div>
            <div>
                {
                    `For ${state.mealtimePickerMealtime} on 
                        ${state.mealtimePickerDay}...`
                }
            </div>
            <Selector />
            <Suggestions />
            <MealGen />
        </div>
    );
}