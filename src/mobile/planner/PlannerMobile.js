import React, { useEffect } from 'react';
import '../../planner/planner.css';
import { Selector } from '../../planner/selector/Selector';
import { Suggestions } from '../../planner/suggestions/Suggestions';
import { useMainContext } from '../../main/MenurRouter';
import { useParams } from 'react-router-dom';
import { MealPlanMobile } from './mealplan/MealPlanMobile';


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

    return(
        <div className='container mt-3 planner-page'>
            <div className='row'>
                <Selector/>
                <Suggestions/>
            </div>
            <div className='container mealplan-row col col-12 p-0 shadow shadow my-3 pb-2 border border'>
                <MealPlanMobile className='col col-12 ms-md-4 my-2 p-0' />
            </div>
        </div>
    );
}