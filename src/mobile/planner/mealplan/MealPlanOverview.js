import React from 'react';
import { useMainContext } from '../../../main/MenurRouter';
import { days, mealtimes } from '../../../shared/states';
import { DropTarget } from 'react-drag-drop-container';
export const MealPlanOverview = () => {

    const { state, dispatch } = useMainContext();

    const MealPlanOverviewSlot = ({mealtime, day}) => {
        return(
            <div>
                {state.mealplan[day][mealtime].name 
                ? '✓' : 'X'}
            </div>
        );
    }

    const handleDragEnter = (e) => {
        console.debug("handleDragEnter");
    }
    const handleDragLeave = (e) => {
        console.debug("handleDragLeave");
    }
    const handleDrop = (e) => {
        console.debug("handleDrop");
        dispatch({type: 'OPEN_ADD_MEAL', data: e.dragData})
    }
    const handleClick = (e) => {
        console.debug("handleClick");
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
        <div className='container mealplan-target-m mb-2' onClick={handleClick} >
        <DropTarget targetKey='meal' as='div'
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
            onHit={handleDrop} 
            style={{minHeight:'100px', minWidth:'100px'}}
            > 
            <Plan className='mealtime mb-2 mt-1'/>
        </DropTarget>
        </div>
    )
}