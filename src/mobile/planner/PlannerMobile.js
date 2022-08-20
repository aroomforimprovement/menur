import React, { useEffect, useState } from 'react';
import '../../planner/planner.scss';
import { Selector } from '../../planner/selector/Selector';
import { Suggestions } from '../../planner/suggestions/Suggestions';
import { useMainContext } from '../../main/MenurRouter';
import { useParams } from 'react-router-dom';
import { MealPlanOverview } from './mealplan/MealPlanOverview';
import { MealPlanPicker } from './mealplan/MealPlanPicker';
import { MealPlanFull } from './mealplan/MealPlanFull';
import { ShoppingList } from '../../planner/shopping/ShoppingList';
import { PlannerControls } from '../../planner/controls/PlannerControls';

export const PlannerMobile = () => {
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
    }, [splat, dispatch, state.splatSet]);

    const [unsaved, setUnsaved] = useState(false);

    useEffect(() => {
        if(state.backupPlan && state.mealplan === state.backupPlan.mealplan){
            setUnsaved(false);
        }else if(state.backupPlan){
            setUnsaved(true);
        }
    }, [state.mealplan, state.backupPlan])

    return(
        <div className='mt-3'>
            <div hidden={!state.isMealPlanClosed || !state.isPickerClosed}>
                <div className='row'>
                    <Selector className='col col-12'/>
                    <Suggestions/>
                </div>
            </div>
            <div hidden={state.isPickerClosed}>
                <MealPlanPicker meal={state.pickerMeal}/>
            </div>
            <div hidden={state.isMealPlanClosed} 
                className='container mealplan-page'>
                <MealPlanFull />
            </div>
            <div hidden={(!state.isMealPlanClosed)} 
                className='container mt-3 mb-2 planner-page'>
                <div className='container mealplan-row-m col col-12 p-0 shadow shadow my-3 pb-2 border border'>
                    <MealPlanOverview className='col col-12 ms-md-4 my-2 p-0' />
                </div>
            </div>
            <div hidden={!state.isMealtimePickerClosed || !state.isPickerClosed} >
                <ShoppingList />
                <PlannerControls />
            </div>
        </div>
    );
}