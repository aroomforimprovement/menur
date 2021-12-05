import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { DELIM, OR } from '../../shared/meals';
import { DragDropContainer } from 'react-drag-drop-container';
import { useMainContext } from '../../main/MenurRouter';

export const ListItem = ({dragData}) => {
    const { state, dispatch} = useMainContext();
    const [isHighlightedIngredient, setIsHighlightedIngredient] = useState(false);

    const reducer = (state, action) => {
        switch(action.type){
            case 'SET_HIGHLIGHTED_INGREDIENT':{
                return({...state, isHighlightedIngredient: action.data})
            }
            default:
                break;
        }
    }
    const [listItem, listItemDispatch] = useReducer(reducer, {isHighlightedIngredient: false});
    
    const highlightDispatch = useCallback(dispatch, [dispatch]);

    const handleHighlightIngredient = (e) => {
        e.preventDefault();
        setIsHighlightedIngredient(true);
    }

    useEffect(() => {
        const setHighlightedIngredient = () => {
            listItemDispatch({type: 'SET_HIGHLIGHTED_INGREDIENT', data: true});
        }
        if(isHighlightedIngredient && !listItem.isHighlightedIngredient){
            setHighlightedIngredient(false);
        }
    }, [isHighlightedIngredient, listItem.isHighlightedIngredient]);
    
    useEffect(() => {
        if(listItem.isHighlightedIngredient && state.highlightedIngredient !== dragData.name){
            highlightDispatch({type: 'SET_HIGHLIGHTED_INGREDIENT', data: dragData.name})
        }
    }, [dispatch, dragData.name, highlightDispatch, listItem.isHighlightedIngredient, state.highlightedIngredient]);

    return(
        <div>
            <DragDropContainer targetKey='list' 
                dragData={dragData}>
                <div key={dragData.name} className='list-item'>
                    <span >{dragData.name.replaceAll(DELIM, OR)} x {dragData.qty}</span>
                </div>
            </DragDropContainer>
            <button type='button' className='btn btn-sm rounded rounded-circle'
                onClick={handleHighlightIngredient}>
                    <small>?</small>
            </button>
        </div>
    );
}