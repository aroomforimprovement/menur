import React, { useCallback } from "react";
import './shopping.scss';
import { DropTarget } from 'react-drag-drop-container';
import { ListItem } from "./ListItem";
import { useMainContext } from "../../main/MenurRouter";
import ReactTooltip from 'react-tooltip';

export const ShoppingList = ({ list, tag }) => {
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
        e.dragData.list = tag;
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
    const remove = (ingredient) => {
        dispatch({type: 'REMOVE_FROM_LIST', data: ingredient});
    }

    const ingredients = list ? list.map((ingredient, i) => {
        return(
                <li key={i}>
                    <div className='fa fa-caret-left mx-2'
                        onClick={() => decrement(ingredient)}>{' '}</div>
                    <ListItem dragData={ingredient}/>
                    
                    <div className='fa fa-caret-right mx-2'
                        onClick={() => increment(ingredient)}>{' '}</div>
                    <button className={`btn btn-sm rounded rounded-circle border mx-1 py-0 mb-1 clickable
                        highlight-ingredient ${state.highlightedIngredient === ingredient.name 
                            ? 'highlighted' : ''}`}
                        data-tip="Click to highlight meals that use this"
                        onClick={() => {handleHighlightIngredient(ingredient.name)}}>
                        <small>?</small>
                    </button>
                    <button type='button' className='btn-close meal-remove' 
                        onClick={() => remove(ingredient)} 
                        style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} 
                        aria-label='Remove'>
                    </button> 
                    <ReactTooltip type='info' delayShow='500' data-effect='float'
                        place='right'/>
                </li>
            );
    }) : <div></div>;

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