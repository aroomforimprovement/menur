import React from "react";
import { DownloadableMealPlanLandscape, DownloadableMealPlan } from "../../utils/pdfUtils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMainContext } from "../../main/MenurRouter";
import { toast } from 'react-hot-toast';
import { DummyMealPlan } from "./DummyMealPlan";

const apiUrl = process.env.REACT_APP_API_URL;
let proxy = process.env.REACT_APP_PROXY_URL;

export const Plan = ({plan, isLandscape}) => {
    const {state, dispatch} = useMainContext();

    const deletePlan = async () => {
        return await fetch(`${proxy}${apiUrl}app/plan/${plan.id}`, {
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
            return error;
        });
    }
    const handleDeletePlan = () => {
        deletePlan().then((response) => {
            if(response && response.ok){
                toast.success('Mealplan deleted ok');
                //window.location.href = '/account';
                dispatch({type: 'REMOVE_SAVED_PLAN', data: plan.id});
            }else{
                toast.error('Error deleting Mealplan');
                console.error("handleDeletePlan: response not ok");
            }
        });
    }
    const handleOpenPlan = () => {
        window.location.href = `/planner/${plan.id}`;
    }

    return(
        <div className='m-0 p-0 col col-12'>
            {/*<div className='row'>*/}
                <DummyMealPlan mealplan={plan.mealplan} name={plan.name} leftovers={plan.mealplan.leftovers}/>
                {/*<MealPlanViewer mealplan={plan.mealplan} isLandscape={true}/>*/}
            {/*</div>*/}
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
                        fileName={`mealplan_${plan.name}`}>
                            {({blob, url, loading, error}) => 
                                loading ? 'Loading document...' : 'Download'
                            }
                </PDFDownloadLink> : <div></div>}
            </div>
        </div>
    );
}