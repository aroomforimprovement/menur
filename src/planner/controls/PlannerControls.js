import React from 'react';
import { ClearData } from './ClearData';
import { DownloadMealPlan } from './DownloadMealPlan';
import { GenerateList } from './GenerateList';
import { SaveToAccount } from './SaveToAccount';

export const PlannerControls = () => {

    return(
        <div style={{textAlign:'center'}}>
            <SaveToAccount />
            <DownloadMealPlan />
            <ClearData />
            <GenerateList />
        </div>
    );
}