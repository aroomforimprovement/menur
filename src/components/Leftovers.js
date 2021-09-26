import React from 'react';
import { useMainContext } from './Main';
import { Suggestion } from './Suggestions';

export const Leftovers = ({dragData}) => {
    
    const { state } = useMainContext();
    
    const Leftover = ({dragData}) => {
        return(
            <Suggestion dragData={dragData}/>
        );
    }

    const leftovers = state.leftovers.map((leftover, i) => {
        return(
            <div key={i}>
                <Leftover dragData={{meal: leftover}}/>
            </div>
        );
    });

    return(
        <div>{leftovers}</div>
    );
}