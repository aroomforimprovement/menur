import React, { createContext, useContext, useReducer, useState } from 'react';
import './account.scss';
import { useMainContext } from '../main/MenurRouter';
import { accountReducer } from './accountReducer';
import { Form } from 'react-bootstrap';
import { Plan } from './components/Plan';
import { Meal } from './components/Meal';
import { Settings } from './components/settings/Settings';
import { DummyMealPlan } from './components/DummyMealPlan';

const AccountContext = createContext({showSpices: false});

export const useAccountContext = () => {
    return useContext(AccountContext);
}


const Account = () => {
    const { state, dispatch } = useMainContext();

    const [ showSpices, setShowSpices ] = useState(false);
    const [account, accountDispatch] = useReducer(accountReducer, {showSpices: false});
    const stateOfAccount = {account, accountDispatch};

    const handleShowPlans = () => {
        dispatch({type: 'SET_HIDE_PLANS', data: !state.hidePlans});
    }

    const handleShowMeals = () => {
        dispatch({type: 'SET_HIDE_MEALS', data: !state.hideMeals});
    }

    const handleShowSettings = () => {
        dispatch({type: 'SET_HIDE_SETTINGS', data: !state.hideSettings});
    }

    const handleCheckSpices = (e) => {
        const show = !showSpices;
        setShowSpices(show)
        accountDispatch({type: 'SHOW_SPICES', data: show});
    }

    const toggleMealplanViewerClosed = () => {
        dispatch({type: 'VIEW_PLAN', data: false});
    }
    
    const ShowSpices = () => {
        return(<div className='row mb-4'>    
            <small className='col col-7 col-sm-5 col-md-4 col-lg-3'>
                <Form.Check type="checkbox" onChange={handleCheckSpices} checked={showSpices}
                    className={'show-spices ms-3 p-0'}
                    id={'showSpicesCheckbox'} label={'Shows spices / condiments'}/>
            </small>
        </div>)
    }

    const plans = state && state.plans && state.plans.length > 0
        ? state.plans.slice(0).reverse().map((plan, i) => {
            const link = `/planner/${plan.id}`;
            return(
                <div key={plan.id} 
                    className='plan-container col col-12 col-lg-6 border border-2 rounded rounded-5'>
                    <Plan  plan={plan} link={link} isLandscape={true}/>
                </div>
            );
    }) : <div>No saved mealplans here.</div>;
    
    const meals = state && state.meals && state.meals.length > 0
    ? state.meals.map((meal, i) => {
        return(
            <div key={meal.id} className='col col-6 col-md-3 mb-2'>
                <Meal meal={meal} showSpices={showSpices} index={i}/>
            </div>
        );
    }) : <div>No saved meals here.</div>;


    return(
        <div className='container account-page'>
            <AccountContext.Provider value={stateOfAccount}>
                <AccountContext.Consumer>
                    {() => (
                        <div>
                            <div hidden={state.viewPlan}>
                                <div className='row account-heading mt-2'>
                                    <h3>{state.user.username}</h3>
                                </div>
                                <div className='row account-plans my-4 px-2 shadow shadow-lg border border-light '>
                                    <div className='account-plans-header text-center p-4'
                                        onClick={handleShowPlans}>
                                        <h5>Meal Plans:</h5>
                                    </div>
                                    <div className='container' hidden={state.hidePlans}>
                                        <div className='row mb-4 plan-row'>{plans}</div>
                                    </div>
                                </div>
                                <div className='row account-meals my-4 px-2 shadow shadow-lg border border-light'>
                                    <div className='col col-12'>
                                        <div className='account-meals-header p-4 text-center'
                                            onClick={handleShowMeals}>
                                            <h5>Meals:</h5>
                                        </div>
                                        <div className='container' hidden={state.hideMeals}>
                                            <ShowSpices />
                                            <div className='row mb-4 mt-4'>{meals}</div>
                                            <ShowSpices />
                                        </div>
                                    </div>
                                </div>
                                <div className='row account-plans my-4 px-2 shadow shadow-lg border border-light '>
                                    <div className='account-plans-header text-center p-4'
                                        onClick={handleShowSettings}>
                                        <h5>Settings:</h5>
                                    </div>
                                    <div hidden={state.hideSettings}>
                                        <Settings />
                                    </div>
                                </div>
                            </div>
                            {state.viewPlan 
                            ? <div>
                                <div onClick={toggleMealplanViewerClosed} 
                                    className={`clickable mt-2 ms-2 p-3 border 
                                        rounded rounded-circle shadow 
                                        fa fa-chevron-left`}>
                                    </div>
                                <DummyMealPlan 
                                    mealplan={state.viewPlan.mealplan} 
                                    name={state.viewPlan.name}/>
                              </div>
                            : <div></div>}
                            <div hidden={!state.viewPlan}>

                            </div>
                        </div>          
                    )}
                </AccountContext.Consumer>
            </AccountContext.Provider>
        </div>
    );
}

export default Account;