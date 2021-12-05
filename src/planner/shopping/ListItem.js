import React from 'react';
import { DELIM, OR } from '../../shared/meals';
import { DragDropContainer } from 'react-drag-drop-container';

export const ListItem = ({dragData}) => {

    return(
        <div className='list-item'>
            <DragDropContainer targetKey='list' 
                dragData={dragData}>
                <div key={dragData.name} >
                    <small >{dragData.name.replaceAll(DELIM, OR)} x {dragData.qty}</small>
                </div>
            </DragDropContainer>
            
        </div>
    );
}