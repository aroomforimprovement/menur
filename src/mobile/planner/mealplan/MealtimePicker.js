import React from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { Selector } from '../../../planner/selector/Selector';
import { Suggestions } from '../../../planner/suggestions/Suggestions';

export const MealtimePicker = () => {
    const { state, dispatch } = useMainContext();
    const toggleMealtimePickerClosed = () => {
        dispatch({
            type: 'SET_MEALTIME_PICKER_CLOSED', 
            data: {
                isMealtimePickerClosed: !state.isMealtimePickerClosed,
                mealtimePickerDay: '',
                mealtimePickerMealtime: ''
            }})
    }
    return(
        <div>
            <div onClick={toggleMealtimePickerClosed} 
                className={`mt-2 ms-0 ms-md-2 p-3 border rounded rounded-circle shadow fa fa-chevron-left`}></div>
            <Selector 
                message={`for 
                        ${state.mealtimePickerMealtime} on ${state.mealtimePickerDay}`}/>
            <Suggestions />
        </div>
    );
}