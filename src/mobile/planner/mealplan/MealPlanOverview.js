import React, { useState } from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { days, mealtimes } from '../../../shared/states';
import { DropTarget } from 'react-drag-drop-container';
export const MealPlanOverview = ({mealplan}) => {

    const { state, dispatch } = useMainContext();
    const [isTextDisplayed, setIsTextDisplayed] = useState(false);

    const MealPlanOverviewSlot = ({mealtime, day}) => {
        const meal = mealplan 
            ? mealplan[day][mealtime].name
            : state.mealplan[day][mealtime].name; 
        return(
            <div>
                {isTextDisplayed 
                ? <div className={`tiny`}>
                    {meal
                    ? meal : 'XXXX'}
                  </div>
                : <div>
                    {meal 
                    ? '✓' : 'X'}
                  </div>
                }
                
            </div>
        );
    }

    const handleDragEnter = (e) => {
    }
    const handleDragLeave = (e) => {
    }
    const handleDrop = (e) => {
        dispatch({
            type: 'SET_PICKER_CLOSED', 
            data: {
                isPickerClosed: false, 
                pickerMeal: e.dragData
            }
        });
    }
    const handleClick = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SET_MEALPLAN_CLOSED',
            data: false
        });
    }

    const MealPlanRow = ({mealtime}) => {
        const mealslots = days.map((day) => {
            return(
                <div className={'col col-1 mealplan-slot-o my-1'} key={day} >
                    <MealPlanOverviewSlot mealtime={mealtime} day={day} />
                </div>
            );
        });
        return(
            <div className={'row'}>
                <div className={'col col-1 mealplan-header-o header-y-o pt-1 pb-1'}>
                    {mealtime.substring(0,1)}
                </div>
                {mealslots}
            </div>
        )
    }

    const Plan = () => {

        const rows = mealtimes.map((mealtime) => {
            return(
                <MealPlanRow key={mealtime} mealtime={mealtime}/>
            );
        });
        const header = days.map((day) => {
            return(
                <div className={'col col-1 mealplan-header-o header-x-o my-1'} key={day}>
                    {day.substring(0,1)}
                </div>
            );
        });
        return(
            <div className='container mealplan-container-o'>
                <div className='row'>
                    <div className={'col col-1 mealplan-header-o header-xy-o center'}>
                        {''}
                    </div>
                    {header}
                </div>
                {rows}
            </div>
        );
    }
    return(
        <div>
            <div >
                <button className={`butt butt-standard col col-12`} onClick={() => setIsTextDisplayed(!isTextDisplayed)}>
                    {`${isTextDisplayed ? 'Hide text' : 'Show text'}`}
                </button>
            </div>
            <div className='container mealplan-target-m mb-2' onClick={handleClick} >
            <DropTarget targetKey='meal' as='div'
                onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                onHit={handleDrop} 
                style={{minHeight:'100px', minWidth:'100px'}} > 
                <Plan className='mealtime mb-2 mt-1'/>
            </DropTarget>
            </div>
        </div>
    )
}