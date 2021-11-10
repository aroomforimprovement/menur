import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { DownloadableMealPlan, DownloadableMealPlanLandscape } from '../../utils/pdfUtils';


export const MealPlanViewer = ({mealplan, isLandscape}) => {
    //console.dir(mealplan);
    return(
        <div>
        {mealplan 
        ?
            <PDFViewer >
                {isLandscape 
                ? <DownloadableMealPlanLandscape mealplan={mealplan} />
                : <DownloadableMealPlan mealplan={mealplan}/>}
            </PDFViewer>
        :
            <div></div>
        }
        </div>
    )
}

ReactDOM.render(<MealPlanViewer />, document.getElementById('root'));