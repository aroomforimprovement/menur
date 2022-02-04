import React, { useEffect, useState } from 'react';
import '../../planner/planner.css';
import { Selector } from '../../planner/selector/Selector';
import { Suggestions } from '../../planner/suggestions/Suggestions';
import { useMainContext } from '../../main/MenurRouter';
import { useParams } from 'react-router-dom';
import { MealPlanOverview } from './mealplan/MealPlanOverview';
import { MealPlanPicker } from './mealplan/MealPlanPicker';
import { MealPlanFull } from './mealplan/MealPlanFull';
import { Footer } from '../../planner/Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DownloadableMealPlan, DownloadableMealPlanLandscape } from '../../utils/pdfUtils';
import { GenList } from '../../planner/shopping/GenList';

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
                    {/**Below button needs to be abstracted - repeat from Planner.js */}
                    
                    <div className='row mt-2 mb-2'>
                        <button onClick={handleGenList} 
                            className='shadow btn btn-warning border border-success col col-12'>
                            Generate shopping list (if you make changes to the meal plan, you'll have to do this again)
                        </button>
                    </div>
                    <div className='row my-2'>
                        {state ? <PDFDownloadLink className={'btn btn-success'}
                            document={state.isLandscape 
                            ? <DownloadableMealPlanLandscape mealplan={state.mealplan}/> 
                            : <DownloadableMealPlan mealplan={state.mealplan}/>}
                                fileName={`mealplan_${new Date()}`}>
                                    {({blob, url, loading, error}) => 
                                        loading ? 'Loading document...' : 'Download Meal Plan as PDF'
                                    }  
                        </PDFDownloadLink> : <div></div>}
                    {/**state && state.mealplan ? <MealPlanViewer mealplan={state.mealplan} isLandscape={state.isLandscape}/> : <div></div>*/}
                    </div>
                    <Footer className='footer'/>
            </div>
        </div>
    );
}