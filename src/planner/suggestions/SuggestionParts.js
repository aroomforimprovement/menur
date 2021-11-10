import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useMainContext } from '../../main/MenurRouter';


export const PlusToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className='border rounded-circle custom-toggle plus-toggle'
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <small>{'+'}</small>
      {children}
    </div>
));

export const InfoToggle = React.forwardRef(({ children, onClick }, ref) => (
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


export const DropToSelectDay = ({day, keyProp, dragData}) => {

    const {dispatch} = useMainContext();

    const swallowClick = (e) => {
        e.preventDefault();
    }
    
    const handleClickMealtime = (dragData, mealtime) => {
            dragData.day = day;
            dragData.mealtime = mealtime;
            dispatch({type: 'ADD_MEAL', data: dragData});
    }

    return(<li onClick={swallowClick}>
        <Dropdown drop={'right'} as={'div'} 
            id={`${day}${keyProp}`} 
            onClick={swallowClick}
            >
            <Dropdown.Toggle as={'div'} className={`sugg-click-add-day`}>
                <small>{day}</small>        
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby={`${day}${keyProp}`}>
                <Dropdown.Item onClick={() => handleClickMealtime(dragData, "Dinner")}>
                    <small>Dinner</small>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleClickMealtime(dragData, "Lunch")}>
                    <small>Lunch</small>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleClickMealtime(dragData, "Breakfast")}>
                    <small>Breakfast</small>
                </Dropdown.Item >
            </Dropdown.Menu>
        </Dropdown>
    </li>)
}

export const dropSelectDays = (keyProp, dragData) => {
    const swallowClick = (e) => {e.preventDefault()}
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const lists = days.map((day) => {
        return(
            <div key={`${day}${keyProp}`} onClick={swallowClick}>
                <DropToSelectDay day={day} keyProp={keyProp} dragData={dragData}/>
            </div>
        );
    });
    return lists;
}


export const ClickAddToMealPlan = ({keyProp, dragData}) => {
    const days = dropSelectDays(keyProp, dragData);
    return(
        <Dropdown drop={'left'}>           
            <Dropdown.Toggle
                as={PlusToggle} 
                id={`suggDrop_${keyProp}_days`} 
                size='sm' >
            </Dropdown.Toggle>  
            <Dropdown.Menu>
                {days}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export const ClickToExpandMeal = ({ingredients, keyProp, dragData}) => {
    const {state, dispatch} = useMainContext();
    const handleToggle = (isOpen) => {
        console.dir(isOpen);
        if(isOpen){
            dispatch({type: 'SET_SELECTED_SUGGESTION', data: dragData.meal});
        }else{
            dispatch({type: 'UNSET_SELECTED_SUGGESTION', data: dragData.meal});
        }
    }
    return(
    <Dropdown onToggle={handleToggle} 
        drop={'right'} show={state.selectedSuggestion.name === dragData.meal.name}>
        <Dropdown.Toggle 
            as={InfoToggle} 
            id={`suggDrop_${keyProp}`}
            size='sm'  >
        </Dropdown.Toggle>  
        <Dropdown.Menu >
            {ingredients}
        </Dropdown.Menu>
    </Dropdown>
    )
}