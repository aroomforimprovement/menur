import React, { useCallback, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useMainContext } from '../../../main/MenurRouter';
import { ListDraggable } from './ListDraggable';
import { DropTarget } from 'react-drag-drop-container';

export const ListIngredient = ({ingredient, index}) => {

    const { state, dispatch } = useMainContext();

    const highlightDispatch = useCallback(dispatch, [dispatch]);

    const handleHighlightIngredient = (name) => {
        highlightDispatch({type: 'SET_HIGHLIGHTED_INGREDIENT', data: name})
    }

    const decrement = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) - 1;
        highlightDispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const increment = (old) => {
        let update = {...old};
        update.qty = parseFloat(old.qty) + 1;
        highlightDispatch({type: 'UPDATE_ON_LIST', data: {old: old, update: update}});
    }
    const remove = (ingredient) => {
        highlightDispatch({type: 'REMOVE_FROM_LIST', data: ingredient});
    }

    const [classes, setClasses] = useState('');
    
    const handleEnter = () => {
        setClasses(' pt-2 ');
    }

    const handleExit = () => {
        setClasses('');
    } 

    const handleReorder = () => {
        dispatch({type: 'DROPPED', data: index})
    }

    return(
        <li className={`list-item-container my-0 ${classes}`}>
            <DropTarget 
                targetKey='list'
                onDragEnter={handleEnter}
                onDragLeave={handleExit}
                onHit={handleReorder} >
            <div className={`butt butt-alternate-outline fa fa-caret-left mx-1 py-1 px-2`}
                onClick={() => decrement(ingredient)}>{' '}</div>
            <ListDraggable 
                dragData={ingredient} /> 
            <div style={{
                    display:'inline', 
                    textAlign:'end', 
                    marginRight:'0px',
                    color:'green'
                }} 
                className={`highlight-ingredient`}>
                <button className={`butt butt-attn-outline rounded rounded-circle mx-1 py-0 mb-1 clickable
                    ${state.highlightedIngredient === ingredient.name 
                    ? 'highlighted' : ''}`}
                    data-tip="Click to highlight meals that use this"
                    onClick={() => {handleHighlightIngredient(ingredient.name)}}>
                    <small>?</small>
                </button>
            </div>       
            <div className='butt butt-alternate-outline fa fa-caret-right me-5 border py-1 px-2 float-end'
                onClick={() => increment(ingredient)}>{' '}</div>
            <button type='button' className='btn-close meal-remove' 
                onClick={() => remove(ingredient)} 
                //style={{ width:'3px', height:'3px', top:'2px', right:'2px' }} 
                aria-label='Remove'>
            </button> 
            <ReactTooltip type='info' delayShow={500} data-effect='float'
                place='right'/>
            </DropTarget>
        </li>
    );
}