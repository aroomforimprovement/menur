import React from "react";
import '../css/plan.scss';
import { DownloadableMealPlanLandscape, DownloadableMealPlan } from "../../utils/pdfUtils";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMainContext } from "../../main/MenurRouter";
import { toast } from 'react-hot-toast';
import { ToastConfirm, toastConfirmStyle } from "../../common/Toasts";
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

        const setIsEdit = (id) => {
            toast.dismiss(id);
            window.location.href = `/planner/${plan.id}/1`;
        }

        const setIsCopy = (id) => {
            toast.dismiss(id);
            window.location.href = `/planner/${plan.id}/0`;
        }

        toast((t) => (
            <ToastConfirm t={t} approve={setIsEdit} dismiss={setIsCopy}
                message={'Would you like to edit this mealplan or create a copy and edit that?'}
                approveBtn={'Edit this one'} dismissBtn={'Create a copy'} />
        ), toastConfirmStyle());
    }

    return(
        <div className='container m-0 p-0 col col-12'>
            {/*<div className='row'>*/}
                <DummyMealPlan mealplan={plan.mealplan} name={plan.name} leftovers={plan.mealplan.leftovers}/>
                {/*<MealPlanViewer mealplan={plan.mealplan} isLandscape={true}/>*/}
            {/*</div>*/}
            <div className='row plan-controls py-2 col-10 m-auto'>
                <button className='butt butt-warn shadow shadow-sm col col-4 m-auto'
                    onClick={handleDeletePlan}>
                        Delete
                </button>
                <button className='butt butt-outline-standard open-plan shadow shadow-sm col col-4 m-auto'
                    onClick={handleOpenPlan}>
                        Open
                </button>
                {state && plan ? <PDFDownloadLink className={'butt butt-good pdf-download shadow shadow-sm col col-4 m-auto center'}
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