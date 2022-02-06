import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import { useMainContext } from '../../main/MenurRouter';
import { DownloadableMealPlan, DownloadableMealPlanLandscape } from '../../utils/pdfUtils';

export const DownloadMealPlan = () => {
    const { state } = useMainContext();
    
    return(
        <div className={'btn btn-success shadow my-1 col col-11 py-0 mb-2 mx-auto'} style={{display:'inline-block'}}>
            <span className={'fa fa-lg fa-download'}>{' '}</span>
            {state ? <PDFDownloadLink className={'btn btn-success'}
                        document={state.isLandscape 
                        ? <DownloadableMealPlanLandscape mealplan={state.mealplan}/> 
                        : <DownloadableMealPlan mealplan={state.mealplan}/>}
                            fileName={`mealplan_${new Date()}`}>
                                {({blob, url, loading, error}) => 
                                    loading ? 'Loading document...' : 'Download Meal Plan as PDF'
                                }  
                    </PDFDownloadLink> : <div></div>}
            <span className={'fa fa-lg fa-download'}>{' '}</span>
        </div>
    )
}