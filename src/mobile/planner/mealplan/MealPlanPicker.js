import React from 'react';
import { days, mealtimes } from '../../../shared/states';




export const MealPlanPicker = () => {
    const MealPlanDayPicker = () => {
        const MealPlanDaySlot = ({day}) => {
            return(
                <div>
                    <button>{day}</button>
                </div>
            )
        }
        const daySlots = days.map((day) => {
            return(
                <li key={day}>
                    <MealPlanDaySlot day={day}/>
                </li>
            );
        });
        return(
            <div>
                <ul className={'list-unstyled'}>{daySlots}</ul>
            </div>
        );
    }
    
    const MealPlanMealtimePicker = ({time}) => {
        const MealPlanMealtimeSlot = () => {
            return(
                <div>
                    <button>{time}</button>
                </div>
            )
        }
        const timeSlots = mealtimes.map((time) => {
            return(
                <li key={time}>
                    <MealPlanMealtimeSlot time={time}/>
                </li>
            );
        });
        return(
            <div>
                <ul className={'list-unstyled'}>{timeSlots}</ul>
            </div>
        );
    }

    return(
        <div>
            
        </div>
    )
}
