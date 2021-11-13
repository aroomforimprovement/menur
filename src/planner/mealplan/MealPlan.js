import React from 'react';
import './mealplan.css';
import { MealPlanSlot } from './MealPlanSlot';
import { Leftovers } from './Leftovers.js';
import { useMainContext } from '../../main/MenurRouter';
import { days, mealtimes } from '../../shared/states';

export const MealPlan = () => {

    const { state, dispatch } = useMainContext();

    const toggleOrientation = () => {
        dispatch({type: 'SET_IS_LANDSCAPE', data: !state.isLandscape})
    }

    const LandscapeRow = ({mealtime}) =>{
        const mealslots = days.map((day) => {
            return(
                <div className={'col col-1 mealplan-slot'} key={day}>
                    <MealPlanSlot mealtime={mealtime} day={day}/>
                </div>
            );
        });
        return(
            <div className='row '>
                <div className={'col col-1 mealplan-header header-y px-0 pt-3 pb-1'}>{mealtime}</div>
                {mealslots}
            </div>
        )
    }

    const LandscapePlan = () => {
        const rows = mealtimes.map((mealtime) => {
            return(
                <LandscapeRow key={mealtime} mealtime={mealtime} />
            );
        });
        const header = days.map((day) => {
            return(
                <div className={'col col-1 mealplan-header header-x p-0 m-2'} key={day}>{day}</div>
            );
        });
        return(
            <div className='container mealplan-container'>
                <div className='row'>
                <div className='row '>
                    <div className={'col col-1 mealplan-header header-xy p-0 m-1 center'}>*</div>
                    {header}
                </div>
                {rows}
                <div className='leftover-col col col-12 ms-0 p-0 mt-3'>
                    <h5 >Leftovers: </h5>
                    <Leftovers className=''/>
                </div>
                </div>
            </div>
        );
    }

    const PortraitRow = ({day}) => {
        const mealslots = mealtimes.map((mealtime) => {
            return(
                <div className={'col col-3 mealplan-slot mb-2'} key={mealtime}>
                    <MealPlanSlot mealtime={mealtime} day={day}/>
                </div>
            );
        });
        return(
            <div className='row'>
                <div className='mealplan-header header-y col col-2 pt-3'>{day}</div>
                {mealslots}
            </div>
        )
    }

    const PortraitPlan = () => {
        const rows = days.map((day) => {
            return(
                <PortraitRow  key={day} day={day}/>
            );
        });
        const header = mealtimes.map((day) => {
            return(
                <div className={'col mealplan-header header-x-pt my-2'} key={day}>{day}</div>
            )
        });
        return(
            <div className='container'>
                <div className='row'>
                    <div className={'col col-2 mealplan-header header-xy p-0 m-1'}>*</div>
                    {header}
                </div>
                {rows}
                <div className='leftover-col col col-12 ms-0 mt-3'>
                    <h5 className='m-0 p-0'>Leftovers: </h5>
                    <Leftovers />
                </div>
            </div>
        );
    }

    
    return(
        <div className={`mealplan-${state.isLandscape ? 'ls' : 'pt'} `}>
            <button onClick={toggleOrientation} className={`btn-sm mt-4 py-1 px-2 border shadow shadow-sm ${state.isLandscape ? 'toggle-orientation-ls' : 'toggle-orientation-pt'}`}>{state.isLandscape ? "[ || ] " : "[ = ] "} Toggle Orientation</button>
            <div className='mt-2'>
            {
                state.isLandscape ? <LandscapePlan /> : <PortraitPlan />
            }
            </div>
        </div>
    );
}