import React from "react";
import { DownloadableMealPlanLandscape, DownloadableMealPlan } from "../../utils/pdfUtils";
import { MealPlanViewer } from "./MealPlanViewer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMainContext } from "../MenurRouter";

const apiUrl = process.env.REACT_APP_API_URL;

export const Plan = ({plan, isLandscape}) => {
    const {state} = useMainContext();

    const deletePlan = async () => {
        return await fetch(`${apiUrl}app/plan/${plan.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.user.access}`
            }
        }).then(response => {
            if(response.ok){
                console.dir(response);
                return response;
            }
        }, error => {
            console.error(error);
        }).catch((error) => {
            console.error(error);
        });
    }
    const handleDeletePlan = () => {
        deletePlan().then((response) => {
            if(response && response.ok){
                window.location.href = '/account';
            }else{
                console.error("handleDeletePlan: response not ok");
            }
        });
    }
    const handleOpenPlan = () => {
        console.error("handleEditPlan not implemented");

    }

    return(
        <div className='container account-plan p-1'>
            <div className='row'>
                <h6>{plan.name}</h6>
            </div>
            <div className='row'>
                <MealPlanViewer mealplan={plan.mealplan} isLandscape={true}/>
            </div>
            <div className='row'>
                <button className='btn btn-sm btn-warning col col-4'
                    onClick={handleDeletePlan}>
                        Delete
                </button>
                <button className='btn btn-sm btn-outline-primary col col-4'
                    onClick={handleOpenPlan}>
                        Open
                </button>
                {state && plan ? <PDFDownloadLink className={'btn btn-sm btn-success col col-4'}
                    document={isLandscape 
                    ? <DownloadableMealPlanLandscape mealplan={plan.mealplan}/> 
                    : <DownloadableMealPlan mealplan={plan.mealplan}/>} 
                        fileName={`mealplan_${new Date()}`}>
                            {({blob, url, loading, error}) => 
                                loading ? 'Loading document...' : 'Download'
                            }
                </PDFDownloadLink> : <div></div>}
            </div>
        </div>
    );
}