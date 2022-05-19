import React, { useEffect, useState } from 'react';
import './planner.scss';
import { Selector } from './selector/Selector';
import { Suggestions } from './suggestions/Suggestions';
import { MealPlan } from './mealplan/MealPlan';
import { ShoppingList } from './shopping/ShoppingList';
import { useMainContext } from '../main/MenurRouter';
import { useParams } from 'react-router';
import { MealtimePicker } from '../mobile/planner/mealplan/MealtimePicker';
import { PlannerControls } from './controls/PlannerControls';


const Planner = ({edit}) => {
    
    const { state, dispatch } = useMainContext();
    const params = useParams();
    const splat = params.id;

    useEffect(() => {
        const setSplat = () => {
            dispatch({type: 'SET_SPLAT', data: splat});
        }
        if(splat && !state.splatSet){
            setSplat();
        }
    },[splat, dispatch, state.splatSet]);

    const [unsaved, setUnsaved] = useState(false);

    useEffect(() => {
        if(state.backupPlan && state.mealplan === state.backupPlan.mealplan){
            setUnsaved(false)
        }else if(state.backupPlan){
            setUnsaved(true);
        }
    }, [state.mealplan, state.backupPlan])

    return(  
        <div className='container mt-3 planner-page'>
            <div hidden={!state.isMealtimePickerClosed}>
                <div className='row'>
                    <Selector />
                    <Suggestions />                        
                </div>
                <div className='container mealplan-row col col-12 p-0 shadow shadow my-3 pb-2 border border'>
                    <div className='row p-0'>
                        <MealPlan unsaved={unsaved} className='col col-12 ms-md-4 my-2 p-0'/>
                    </div>
                </div>
                <ShoppingList className='col col-12'/>
                <PlannerControls />
            </div>         
            <div hidden={state.isMealtimePickerClosed}>
                <MealtimePicker />
            </div>          
        </div>                 
    );
}

export default Planner;