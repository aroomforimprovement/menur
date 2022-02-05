import React, { useEffect } from 'react';
import '../../planner/planner.scss';
import { Selector } from '../../planner/selector/Selector';
import { Suggestions } from '../../planner/suggestions/Suggestions';
import { useMainContext } from '../../main/MenurRouter';
import { useParams } from 'react-router-dom';
import { MealPlanOverview } from './mealplan/MealPlanOverview';
import { MealPlanPicker } from './mealplan/MealPlanPicker';
import { MealPlanFull } from './mealplan/MealPlanFull';
import { GenList } from '../../planner/shopping/GenList';
import { DownloadMealPlan } from '../../planner/controls/DownloadMealPlan';
import { SaveToAccount } from '../../planner/controls/SaveToAccount';
import { ClearData } from '../../planner/controls/ClearData';
import { GenerateList } from '../../planner/controls/GenerateList';

export const PlannerMobile = () => {
    const { state, dispatch } = useMainContext();
    //const [isMealPlanClosed, setIsMealPlanClosed] = useState(true);
    //const [isPickerClosed, setIsPickerClosed] = useState(true);
    const params = useParams();
    const splat = params.id;

    const handleGenList = () => {
        dispatch({type: 'GEN_LIST', data:true});
    }
    useEffect(() => {
        const setSplat = () => {
            dispatch({type: 'SET_SPLAT', data: splat});
        }
        if(splat && !state.splatSet){
            setSplat();
        }
        console.debug(state.isMealPlanClosed + " | " + state.isPickerClosed);
    }, [splat, dispatch, state.splatSet, state.isMealPlanClosed, state.isPickerClosed]);

    return(
        <div>
            
            <div hidden={!state.isMealPlanClosed || !state.isPickerClosed}>
                <div className='row'>
                    <Selector/>
                    <Suggestions/>
                </div>
            </div>
            <div hidden={state.isPickerClosed}>
                <MealPlanPicker meal={state.pickerMeal}/>
            </div>
            <div hidden={state.isMealPlanClosed} 
                className='container mealplan-page'>
                <MealPlanFull/>
            </div>
            <div hidden={(!state.isMealPlanClosed)} 
                className='container mt-3 mb-2 planner-page'>
                <div className='container mealplan-row-m col col-12 p-0 shadow shadow my-3 pb-2 border border'>
                    <MealPlanOverview className='col col-12 ms-md-4 my-2 p-0' />
                </div>
            </div>
            <div hidden={!state.isMealtimePickerClosed}>
                <GenList />
                    <GenerateList />
                    <div className='row my-2'>
                        <DownloadMealPlan />
                    </div>
                    <div className='mt-4'>
                    <SaveToAccount />
                    <ClearData />
                </div>
            </div>
        </div>
    );
}