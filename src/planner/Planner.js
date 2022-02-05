import React, { useEffect } from 'react';
import './planner.scss';
import { Selector } from './selector/Selector';
import { Suggestions } from './suggestions/Suggestions';
import { MealPlan } from './mealplan/MealPlan';
import { GenList } from './shopping/GenList';
import { useMainContext } from '../main/MenurRouter';
import { useParams } from 'react-router';
import { MealtimePicker } from '../mobile/planner/mealplan/MealtimePicker';
import { DownloadMealPlan } from './controls/DownloadMealPlan';
import { GenerateList } from './controls/GenerateList';
import { SaveToAccount } from './controls/SaveToAccount';
import { ClearData } from './controls/ClearData';


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

    return(  
            <div className='container mt-3 planner-page'>
                <div hidden={!state.isMealtimePickerClosed}>
                <div className='row'>
                    <Selector />
                    <Suggestions/>                        
                </div>
                <div className='container mealplan-row col col-12 p-0 shadow shadow my-3 pb-2 border border'>
                    <div className='row p-0'>
                        <MealPlan className='col col-12 ms-md-4 my-2 p-0'/>
                    </div>
                </div>
                <div className='row my-2'>
                    <DownloadMealPlan />
                </div>
                <GenerateList />
                <div className='row'>
                    <GenList className='col col-3'/>
                </div>
                <div className='mt-4'>
                    <SaveToAccount />
                    <ClearData />
                </div>
                </div>
                <div hidden={state.isMealtimePickerClosed}>
                    <MealtimePicker />
                </div>
            </div>                    
    );
}

export default Planner;