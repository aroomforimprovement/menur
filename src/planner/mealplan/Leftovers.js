import React from 'react';
import { useMainContext } from '../../main/MenurRouter';
import { Suggestion } from '../suggestions/suggestion/Suggestion';


export const Leftovers = ({dragData}) => {
    
    const { state } = useMainContext();
    
    const Leftover = ({dragData}) => {
        return(
            <Suggestion dragData={dragData}/>
        );
    }

    const leftovers = state && state.leftovers && state.leftovers.length 
        ? state.leftovers.map((leftover, i) => {
        return(
            <div key={i} className='leftover col col-sm-6 col-md-4 col-lg-3 ms-1 mb-1'>
                <Leftover dragData={{meal: leftover}}/>
            </div>
        );
    }) : <div></div>;

    return(
        <div className='col col-12'>{leftovers}</div>
    );
}