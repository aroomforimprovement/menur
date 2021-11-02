import React from "react";
import { MealPlanViewer } from "./MealPlanViewer";

export const Plan = ({plan}) => {


    const handleDeletePlan = () => {
        console.error("handleDeletePlan not implemented");
    }
    const handleOpenPlan = () => {
        console.error("handleEditPlan not implemented");
    }

    return(
        <div className='container account-plan'>
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
            </div>
        </div>
    );
}