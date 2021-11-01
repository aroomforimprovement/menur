import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useMainContext } from '../MenurRouter';


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

    const {state, dispatch} = useMainContext();

    const swallowClick = (e) => {
        e.preventDefault();
    }
    
    const handleClickMealtime = (dragData, mealtime) => {
            dragData.day = day;
            dragData.mealtime = mealtime;
            dispatch({type: 'ADD_MEAL', data: dragData});
            window.localStorage.setItem("MENUR_STATE", JSON.stringify(state));
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
            as={PlusToggle} id={`suggDrop_${keyProp}_days`} 
             size='sm' >
            </Dropdown.Toggle>  
            <Dropdown.Menu>
                {days}
            </Dropdown.Menu>
        </Dropdown>
    );
}