import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useMainContext } from '../../main/MenurRouter';
import { DownloadableMealPlan, DownloadableMealPlanLandscape } from '../../utils/pdfUtils';

export const DownloadMealPlan = () => {
    const { state } = useMainContext();

    const handleDownload = async () => {
        const blob = await pdf(
            state.isLandscape 
            ? DownloadableMealPlanLandscape(state.mealplan)
            : DownloadableMealPlan(state.mealplan)).toBlob();
        saveAs(blob, `Menur Plan - ${state.mealplan.name ? state.mealplan.name : Date.now()}`)
    }

    return(
        <div>
            <button onClick={handleDownload} 
                className={'butt butt-good shadow my-1 col col-11 mb-2 mx-auto'} style={{display:'inline-block'}}>
                <span className={'fa fa-lg fa-download'}>{' '}</span>
                    Download Meal Plan
                <span className={'fa fa-lg fa-download'}>{' '}</span>
            </button>
        </div>
    )
}