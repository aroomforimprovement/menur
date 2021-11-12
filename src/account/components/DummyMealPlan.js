import React, { useState } from 'react';
import { DummyMealPlanSlot } from './DummyMealPlanSlot';
import { days, mealtimes } from '../../shared/states';


export const DummyMealPlan = ({mealplan, name}) => {

    const [ isLandscape, setIsLandscape ] = useState(true);

    const toggleOrientation = () => {
        setIsLandscape(!isLandscape);
    }

    const LandscapeRow = ({mealtime}) =>{
        const mealslots = days.map((day) => {
            return(
                <div className={'col col-1 dummy-plan-header p-0 mx-1 my-2'} key={day}>
                    <DummyMealPlanSlot mealplan={mealplan} isLandscape={isLandscape}
                        mealtime={mealtime} day={day}/>
                </div>
            );
        });
        return(
            <div className='row'>
                <div className={'col col-1 dummy-plan-header px-0 my-1 pt-3 pb-1'}>{mealtime}</div>
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
                <div className={'col col-1 dummy-plan-header p-0 m-2'} key={day}>{day}</div>
            );
        });
        return(
            <div className='container'>
                <div className='row'>
                    <div className={'col col-1 dummy-plan-header p-0 m-1'}>*</div>
                    {header}
                </div>
                {rows}
            </div>
        );
    }

    const PortraitRow = ({day}) => {
        const mealslots = mealtimes.map((mealtime) => {
            return(
                <div className={'col dummy-plan-header'} key={mealtime}>
                    <DummyMealPlanSlot 
                        mealplan={mealplan} isLandscape={isLandscape} 
                        mealtime={mealtime} day={day}/>
                </div>
            );
        });
        return(
            <div className='row'>
                <div className='col col-1 dummy-plan-header'>{day}</div>
                {mealslots}
            </div>
        )
    }

    const PortraitPlan = () => {
        const rows = days.map((day) => {
            return(
                <PortraitRow key={day} day={day}/>
            );
        });
        const header = mealtimes.map((day) => {
            return(
                <div className={'col dummy-plan-header'} key={day}>{day}</div>
            )
        });
        return(
            <div className='container'>
                <div className='row'>
                    <div className={'col dummy-plan-header p-0'}>*</div>
                    {header}
                </div>
                {rows}
            </div>
        );
    }
  
    return(
        <div className={'dummy-plan col-12'}>{/*className={`mealplan-${isLandscape ? 'ls' : 'pt'}`}>*/}
            <div className='col col-12'>
                <div className='row'>
                    <div className='col col-9'><strong>{name}</strong></div>
                <button onClick={toggleOrientation} 
                    className={`border shadow mt-1 col ${isLandscape 
                    ? 'toggle-orientation-ls' : 'toggle-orientation-pt'}`}>
                        {isLandscape ? "[ || ] " : "[ = ] "}
                </button>
                </div>
            </div>
            {isLandscape ? <LandscapePlan /> : <PortraitPlan />}
        </div>
    );
}