import React, { useEffect, useState } from 'react';
import '../../planner/planner.css';
import { Selector } from '../../planner/selector/Selector';
import { Suggestions } from '../../planner/suggestions/Suggestions';
import { useMainContext } from '../../main/MenurRouter';
import { useParams } from 'react-router-dom';
import { MealPlanOverview } from './mealplan/MealPlanOverview';
import { MealPlanPicker } from './mealplan/MealPlanPicker';
import { MealPlanFull } from './mealplan/MealPlanFull';

export const PlannerMobile = () => {
    const { state, dispatch } = useMainContext();
    const [isMealPlanClosed, setIsMealPlanClosed] = useState(true);
    const [isPickerClosed, setIsPickerClosed] = useState(true);
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

    return(
        <div>
            <div hidden={(!isMealPlanClosed)} 
                className='container mt-3 mb-2 planner-page'>
                <div className='container mealplan-row-m col col-12 p-0 shadow shadow my-3 pb-2 border border'>
                    <MealPlanOverview className='col col-12 ms-md-4 my-2 p-0' 
                        setIsMealPlanClosed={setIsMealPlanClosed} setIsPickerClosed={setIsPickerClosed}/>
                </div>
                <div className='row'>
                    <Selector/>
                    <Suggestions/>
                </div>
                
            </div>
            <div hidden={isPickerClosed}>
                <MealPlanPicker/>
            </div>
            <div hidden={isMealPlanClosed} 
                className='container mealplan-page'>
                <MealPlanFull/>
            </div>
        </div>
    );
}