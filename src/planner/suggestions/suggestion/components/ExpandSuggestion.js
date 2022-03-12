import React from "react";
import { Dropdown } from "react-bootstrap";
import { useMainContext } from "../../../../main/MenurRouter";


export const ExpandSuggestion = ({ingredients, keyProp, dragData}) => {
  const {state, dispatch} = useMainContext();

  const InfoToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className='border rounded-circle custom-toggle info-toggle'
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <small>{'i'}</small>
      {children}
    </div>
  ));

  const handleToggle = (isOpen) => {
      if(isOpen){
          dispatch({type: 'SET_SELECTED_SUGGESTION', data: dragData.meal});
      }else{
          dispatch({type: 'UNSET_SELECTED_SUGGESTION', data: dragData.meal});
      }
  }

  return(
      <Dropdown onToggle={handleToggle} className='sugg-drop'
          drop={'right'} show={state.selectedSuggestion.name === dragData.meal.name}>
          <Dropdown.Toggle 
              as={InfoToggle} 
              id={`suggDrop_${keyProp}`}
              size='sm'  >
          </Dropdown.Toggle>  
          <Dropdown.Menu  >
              {ingredients}
          </Dropdown.Menu>
      </Dropdown>
  );
}