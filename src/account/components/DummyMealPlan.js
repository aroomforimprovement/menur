import React from 'react';
import '../css/dummy.scss';
import { MealPlanOverview } from '../../mobile/planner/mealplan/MealPlanOverview';


export const DummyMealPlan = ({mealplan, name}) => {

    return(
        <div className={'dummy-plan'}>{/*className={`mealplan-${isLandscape ? 'ls' : 'pt'}`}>*/}
            <div className='col col-12'>
                <div className='row mt-2 ms-1'>
                    
                    <div className='col col-9'><h6>{name}</h6></div>
                </div>
            </div>
            <MealPlanOverview mealplan={mealplan} />
        </div>
    );
}