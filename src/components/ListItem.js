import React from 'react';
import { DELIM, OR } from '../shared/meals';
import { DragDropContainer } from 'react-drag-drop-container';

export const ListItem = ({dragData}) => {
    
    const handleDragStart = (e) => {

    }
    const handleDragEnd = (e) => {

    }
    const handleDrag = (e) => {

    }
    const handleDrop = (e) => {

    }
    return(
        <DragDropContainer targetKey='list' 
            onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            onDrag={handleDrag} onDrop={handleDrop} dragData={dragData}>
            <div key={dragData.name} >
                <span >{dragData.name.replaceAll(DELIM, OR)} x {dragData.qty}</span>
            </div>
        </DragDropContainer>
    );
}