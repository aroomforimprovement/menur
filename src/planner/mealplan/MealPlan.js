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
                <div className={'col col-1 mealplan-header p-0 m-2'} key={day}>
                    <MealPlanSlot mealtime={mealtime} day={day}/>
                </div>
            );
        });
        return(
            <div className='row'>
                <div className={'col col-1 mealplan-header px-0 m-1 pt-3 pb-1'}>{mealtime}</div>
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
                <div className={'col col-1 mealplan-header p-0 m-2'} key={day}>{day}</div>
            );
        });
        return(
            <div className='container mealplan-container m-0'>
                <div className='row mx-auto'>
                    <div className={'col col-1 mealplan-header p-0 m-1'}>*</div>
                    {header}
                </div>
                {rows}
                <div className='leftover-col col col-12 ms-0 p-0 mt-3'>
                    <h5 >Leftovers: </h5>
                    <Leftovers className=''/>
                </div>
            </div>
        );
    }

    const PortraitRow = ({day}) => {
        const mealslots = mealtimes.map((mealtime) => {
            return(
                <div className={'col mealplan-header mt-2 mx-1'} key={mealtime}>
                    <MealPlanSlot mealtime={mealtime} day={day}/>
                </div>
            );
        });
        return(
            <div className='row'>
                <div className='col pt-3'>{day}</div>
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
                <div className={'col mealplan-header m-2'} key={day}>{day}</div>
            )
        });
        return(
            <div className='container'>
                <div className='row'>
                    <div className={'col mealplan-header p-0 m-1'}>*</div>
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
            <button onClick={toggleOrientation} className={`mt-4 py-2 px-3 border shadow ${state.isLandscape ? 'toggle-orientation-ls' : 'toggle-orientation-pt'}`}>{state.isLandscape ? "[ || ] " : "[ = ] "} Toggle Orientation</button>
            <div className='mt-2'>
            {
                state.isLandscape ? <LandscapePlan /> : <PortraitPlan />
            }
            </div>
        </div>
    );
}