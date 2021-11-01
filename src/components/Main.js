import React from 'react';
import { Selector } from './Selector';
import { Suggestions } from './Suggestions';
import { MealPlan } from './MealPlan';
import { GenList } from './GenList';
import { DownloadableMealPlan, DownloadableMealPlanLandscape } from '../utils/pdfUtils'; 
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useMainContext } from './MenurRouter';
//import { MealPlanViewer } from './partials/MealPlanViewer';




export const Main = () => {
    
    const { state, dispatch} = useMainContext();

    const handleGenList = () => {
        dispatch({type: 'GEN_LIST', data:true});
    }

    return(    
        <div className='container mt-3'>
            <div className='row'>
                <Selector />
                <Suggestions />                        
            </div>
            <div className='row'>
                <MealPlan />
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
            <div className='row mt-2 mb-2'>
                <button onClick={handleGenList} 
                    className='shadow btn btn-warning border border-success col col-12'>
                    Generate shopping list (if you make changes to the meal plan, you'll have to do this again)
                </button>
            </div>
            <div className='row'>
                <GenList className='col col-3'/>
            </div>
        </div>                        
    );
}