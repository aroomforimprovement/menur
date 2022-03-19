import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { days, mealtimes } from '../../../shared/states';
import { addMealToast } from '../../../utils/toastUtils';



export const MealPlanPicker = ({meal}) => {
    
    const { state, dispatch } = useMainContext();
    const [isDayPicked, setIsDayPicked] = useState(false);

    const toggleMealplanPickerClosed = () => {
        dispatch({type: 'SET_PICKER_CLOSED', data: {isPickerClosed : true}})
    }

    const MealPlanDayPicker = ({meal}) => {
        
        const MealPlanDaySlot = ({meal, day}) => {
            const handleClick = (e) => {
                meal.day = day;
                setIsDayPicked(true);
            } 
            
            return(
                <div>
                    <button className={'butt butt-standard-outline col col-12 my-1'}
                        onClick={handleClick}>{day}</button>
                </div>
            )
        }

        const daySlots = days.map((day) => {
            return(
                <li key={day} className={'col col-12'}>
                    <MealPlanDaySlot meal={meal} day={day}/>
                </li>
            );
        });

        return(
            <div className={'container'}>
                <div className='row mt-3 mb-1 mx-auto'><h6>{meal && meal.meal ? `Add ${meal.meal.name} to your meal plan:` : ''}</h6></div>
                <ul className={'list-unstyled'}>{daySlots}</ul>
            </div>
        );
    }

    const MealPlanMealtimePicker = ({meal}) => {
    
        const MealPlanMealtimeSlot = ({meal, time}) => {
            
            const handleClick = (e) => {
                addMealToast({
                    showBasic: state.showBasic,
                    meals: state.meals,
                    dispatch: dispatch,
                    meal: meal.meal,
                    day: meal.day,
                    mealtime: time
                });
            }
    
            return(
                <div>
                    <button className={'butt butt-standard-outline col col-12 my-1'}
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
            <div className={'container'}>
                <div className='row mt-3 mb-1'><h6>{meal && meal.meal ? `Add ${meal.meal.name} to your meal plan on ${meal.day}:` : ''}</h6></div>
                <ul className={'list-unstyled'}>{timeSlots}</ul>
            </div>
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [isDayPicked]);
    return(
        <div>
            <div onClick={toggleMealplanPickerClosed} 
                className={`clickable mt-2 ms-2 p-3 border rounded rounded-circle shadow fa fa-chevron-left`}></div>
            {isDayPicked 
            ? <MealPlanMealtimePicker meal={meal}/> 
            : <MealPlanDayPicker meal={meal}/>}
        </div>
    )
}
