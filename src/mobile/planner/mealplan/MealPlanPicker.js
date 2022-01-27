import React, { useState } from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { days, mealtimes } from '../../../shared/states';



export const MealPlanPicker = ({meal}) => {
    
    const { state, dispatch } = useMainContext();
    const [isDayPicked, setIsDayPicked] = useState(false);

    const MealPlanDayPicker = ({meal}) => {
        
        const MealPlanDaySlot = ({meal, day}) => {
            const handleClick = (e) => {
                meal.day = day;
                setIsDayPicked(true);
            } 
            
            return(
                <div>
                    <button className={'btn btn-outline-secondary col col-10 m-1'}
                        onClick={handleClick}>{day}</button>
                </div>
            )
        }

        const daySlots = days.map((day) => {
            return(
                <li key={day}>
                    <MealPlanDaySlot meal={meal} day={day}/>
                </li>
            );
        });

        return(
            <div>
                <div><h6>{meal && meal.meal ? `Add ${meal.meal.name} to your meal plan:` : ''}</h6></div>
                <ul className={'list-unstyled'}>{daySlots}</ul>
            </div>
        );
    }
    
    const MealPlanMealtimePicker = ({meal}) => {
    
        const MealPlanMealtimeSlot = ({meal, time}) => {
    
            const handleClick = (e) => {
                meal.mealtime = time;
                setIsDayPicked(false);
                dispatch({type: 'ADD_MEAL', data: meal});
            }
    
            return(
                <div>
                    <button className={'btn btn-outline-secondary col col-10 m-1'}
                        onClick={handleClick}>{time}</button>
                </div>
            )
        }
    
        const timeSlots = mealtimes.map((time) => {
            return(
                <li key={time}>
                    <MealPlanMealtimeSlot meal={meal} time={time}/>
                </li>
            );
        });
    
        return(
            <div>
                <div><h6>{meal && meal.meal ? `Add ${meal.meal.name} to your meal plan on ${meal.day}:` : ''}</h6></div>
                <ul className={'list-unstyled'}>{timeSlots}</ul>
            </div>
        );
    }

    return(
        <div>
            {isDayPicked 
            ? <MealPlanMealtimePicker meal={meal}/> 
            : <MealPlanDayPicker meal={meal}/>}
        </div>
    )
}
