import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { DownloadableMealPlan } from '../../utils/pdfUtils';


export const MealPlanViewer = ({mealplan}) => {
    console.dir(mealplan);
    return(
        <div>
        {mealplan 
        ?
            <PDFViewer width={'100%'} height={'100%'}>
                <DownloadableMealPlan mealplan={mealplan}/>
            </PDFViewer>
        :
            <div></div>
        }
        </div>
    )
}

ReactDOM.render(<MealPlanViewer />, document.getElementById('root'));