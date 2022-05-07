import React from 'react';
import './mealplan.scss';
import { MealPlanSlot } from './MealPlanSlot';
import { Leftovers } from './Leftovers.js';
import { useMainContext } from '../../main/MenurRouter';
import { days, mealtimes } from '../../shared/states';
import { isMobile } from 'react-device-detect';
import ReactTooltip from 'react-tooltip';

export const MealPlan = ({unsaved}) => {

    const { state, dispatch } = useMainContext();

    const toggleOrientation = () => {
        dispatch({type: 'SET_IS_LANDSCAPE', data: !state.isLandscape})
    }

    const toggleMealPlanClosed = () => {
        dispatch({
            type: 'SET_MEALPLAN_CLOSED',
            data: true
        });
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
                <div className={'col col-1 mealplan-header header-y pt-3 pb-1'}>{mealtime}</div>
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
                <div className={'col col-1 mealplan-header header-x m-2'} key={day}>{day}</div>
            );
        });
        return(
            <div className='container mealplan-container ps-4'>
                <div className='row'>
                <div className='row '>
                    <div className={'col col-1 mealplan-header header-xy m-1 center'}>
                        <button onClick={toggleOrientation} 
                            className={`mt-1 ms-2 p-3 border rounded rounded-circle shadow shadow-sm toggle-orientation-ls`}>
                                {state.isLandscape ? "[ ||| ] " : "[ = ] "}
                        </button>
                    </div>
                    {header}
                </div>
                {rows}
                <div className='leftover-col col col-12 ms-0 mt-3'>
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
                    <MealPlanSlot mealtime={mealtime} day={day} />
                </div>
            );
        });
        return(
            <div className='row'>
                <div className={`mealplan-header${isMobile ? '-m' : ''} header-y col col-2 pt-3`}>{isMobile ? day.substring(0,1) : day}</div>
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
                <div className={`col  mealplan-header${isMobile ? '-m' : ' my-2'} header-x-pt`} key={day}>{day}</div>
            )
        });
        return(
            <div className='container'>
                <div className='row'>
                    <div className={`col col-2 mealplan-header header-xy ${isMobile ? 'm-1' : state.isLandscape ? 'mb-1' : 'mb-2'} `}>
                    {isMobile 
                        ? <div onClick={toggleMealPlanClosed} 
                            className={`mt-2 ms-0 ms-md-2 p-3 border rounded rounded-circle shadow fa fa-chevron-left`}>
                            
                        </div>
                        : <button onClick={toggleOrientation} 
                            className={`mt-2 ms-0 ms-md-2 p-3 border rounded rounded-circle shadow toggle-orientation-pt`}>
                                <span>{state.isLandscape ? "[ ||| ] " : "[ = ] "}</span>
                          </button>}
                    </div>
                    {header}
                </div>
                {rows}
                <div className='leftover-col row ms-0 mt-3'>
                    <h5 className='m-0 mb-2 col col-3'>Leftovers: </h5>
                    <Leftovers className='col col-3'/>
                </div>
            </div>
        );
    }
   
    return(
        <div className={`mealplan-${state.isLandscape ? 'ls' : 'pt'} `}>
            <div className='mt-2'>
            <div className='float-center'>
                    <h6 style={{display: 'inline'}}>
                        {state.backupPlan && state.backupPlan.name 
                        && window.location.href.toString().indexOf('/0') === window.location.href.toString().length-2
                        ? `Copy of ${state.backupPlan.name}` 
                        : state.backupPlan && state.backupPlan.name 
                        ? state.backupPlan.name 
                        : undefined}</h6>
                    
                    <small 
                        className='fa fa-save float-end' 
                        style={{color:unsaved ? 'red' : 'green', marginLeft: '2rem'}}
                        data-tip={unsaved ? "Unsaved Changes" : "No unsaved changes"}></small> 
                </div>
            {isMobile 
                ? <PortraitPlan /> 
                : state.isLandscape 
                    ? <LandscapePlan /> 
                    : <PortraitPlan />
            }
            </div>
            <ReactTooltip type='info' delayShow={500} data-effect='float'
                place='right'/>
        </div>
    );
}