import React, { useCallback } from "react";
import './shopping.scss';
import { DropTarget } from 'react-drag-drop-container';
import { ListItem } from "./ListItem";
import { useMainContext } from "../../main/MenurRouter";


export const ShoppingList = ({list}) => {
    const { state, dispatch } = useMainContext();

    
    const highlightDispatch = useCallback(dispatch, [dispatch]);

    const handleHighlightIngredient = (name) => {
        highlightDispatch({type: 'SET_HIGHLIGHTED_INGREDIENT', data: name})
    }

    const handleDragEnter = () => {
        
    }
    const handleDragLeave = () => {
 
    }
    const handleDrop = async (e) => {
        await dispatch({type: 'REMOVE_FROM_LIST', data: e.dragData});
        e.dragData.list = list;
        dispatch({type: 'ADD_TO_LIST', data: e.dragData});
    }
    const decrement = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) - 1;
        dispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const increment = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) + 1;
        dispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const remove = (i) => {
        dispatch({type: 'REMOVE_FROM_LIST', data: i});
    }

    const ingredients = state[list].map((ingredient, i) => {
        return(
            state[list].length > 0
                ? 
                <li key={ingredient.name}>
                    <div className='fa fa-caret-left mx-2'
                        onClick={() => decrement(ingredient)}>{' '}</div>
                    <ListItem dragData={ingredient}/>
                    
                    <div className='fa fa-caret-right mx-2'
                        onClick={() => increment(ingredient)}>{' '}</div>
                    <div className='btn btn-sm rounded rounded-circle border mx-1 p-0 highlight-ingredient'
                        onClick={() => {handleHighlightIngredient(ingredient.name)}}>
                        <small>?</small>
                    </div>
                    <button type='button' className='btn-close meal-remove' 
                        onClick={() => remove(ingredient)} 
                        style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} 
                        aria-label='Remove'>
                    </button> 
                </li>
                : <div></div>
        );
    });

    return(
        <DropTarget targetKey='list' 
                onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                onHit={handleDrop}>
            <div className='user-list' >
                <ul className='list-unstyled'>{ingredients}</ul>
            </div>
        </DropTarget>
    );
}