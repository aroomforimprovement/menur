import React, { createContext, useContext, useReducer, useState } from 'react';
import { useMainContext } from './MenurRouter';
import { accountReducer } from '../redux/Account';
import { Form } from 'react-bootstrap';
import { Plan } from './partials/Plan';
import { Meal } from './partials/Meal';

const AccountContext = createContext({showSpices: false});

export const useAccountContext = () => {
    return useContext(AccountContext);
}

const Account = () => {
    const { state, dispatch } = useMainContext();

    const [ hidePlans, setHidePlans ] = useState(true);
    const [ hideMeals, setHideMeals ] = useState(true);
    const [ showSpices, setShowSpices ] = useState(false);
    const [account, accountDispatch] = useReducer(accountReducer, {showSpices: false});
    const stateOfAccount = {account, accountDispatch};

    const handleShowPlans = () => {
        setHidePlans(!hidePlans);
    }

    const handleShowMeals = () => {
        setHideMeals(!hideMeals);
    }

    const handleCheckSpices = (e) => {
        const show = !showSpices;
        setShowSpices(show)
        accountDispatch({type: 'SHOW_SPICES', data: show});
    }

    const plans = state && state.plans && state.plans.length > 0
        ? state.plans.map((plan, i) => {
            const link = `/planner/${plan.id}`;
            return(
                <Plan key={plan.id} plan={plan} link={link}/>
            );
        }) : <div>No saved mealplans here.</div>;

        const meals = state && state.meals && state.meals.length > 0
        ? state.meals.map((meal, i) => {
            return(
                <Meal key={meal.id} meal={meal} showSpices={showSpices}/>
            );
        }) : <div>No saved meals here.</div>;

    return(
        <div className='container account-page'>
            <AccountContext.Provider value={stateOfAccount}>
                <AccountContext.Consumer>
                    {() => (
                        <div>
                            <div className='row account-heading'>
                                <h3>{state.user.username}</h3>
                            </div>
                            <div className='row account-plans'>
                                <div className='account-plans-header'
                                    onClick={handleShowPlans}>
                                    MealPlans:
                                </div>
                                <div className='container' hidden={hidePlans}>
                                    <div className='row mb-4'>{plans}</div>
                                </div>
                            </div>
                            <div className='row account-meals'>
                                <div className='account-meals-header'
                                    onClick={handleShowMeals}>
                                    <h6>Meals:</h6>
                                </div>
                                <div className='container' hidden={hideMeals}>
                                    <div className='row mb-4'>{meals}</div>
                                    <div className='row mb-4'>    
                                        <div className='col col-3'>
                                        <Form.Check type="checkbox" onChange={handleCheckSpices} checked={showSpices}
                                            id={'showSpicesCheckbox'} label={'Shows spices / condiments'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>            
                    )}
                </AccountContext.Consumer>
            </AccountContext.Provider>
        </div>
    );
}

export default Account;