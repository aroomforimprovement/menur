import React, { useState } from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { days, mealtimes } from '../../../shared/states';



export const MealPlanPicker = ({meal}) => {
    
    const { state, dispatch } = useMainContext();
    const [isDayPicked, setIsDayPicked] = useState(false);

    const MealPlanDayPicker = ({meal}) => {
        
        const MealPlanDaySlot = ({day}) => {
            
            const handleClick = () => {
                meal.day = day;
                setIsDayPicked(true);
            } 
            
            return(
                <div>
                    <button onClick={handleClick}>{day}</button>
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
    
    const MealPlanMealtimePicker = ({meal, day}) => {
        const MealPlanMealtimeSlot = ({time}) => {
            const handleClick = () => {
                meal.mealtime = time;
                setIsDayPicked(false);
                dispatch({type: 'ADD_MEAL', data: meal});
            }
            return(
                <div>
                    <button onClick={handleClick}>{time}</button>
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
            {isDayPicked ? <MealPlanMealtimePicker /> : <MealPlanDayPicker />}
        </div>
    )
}
