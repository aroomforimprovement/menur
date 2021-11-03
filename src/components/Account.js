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
    const { state } = useMainContext();

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
                <div key={plan.id} className='col col-5 m-1 border border-secondary'>
                    <Plan  plan={plan} link={link} isLandscape={true}/>
                </div>
            );
        }) : <div>No saved mealplans here.</div>;

        const meals = state && state.meals && state.meals.length > 0
        ? state.meals.map((meal, i) => {
            console.log("meal.id: "+meal.id);
            return(
                <div key={meal.id} className='col col-3'>
                    <Meal meal={meal} showSpices={showSpices}/>
                </div>
            );
        }) : <div>No saved meals here.</div>;

    return(
        <div className='container account-page'>
            <AccountContext.Provider value={stateOfAccount}>
                <AccountContext.Consumer>
                    {() => (
                        <div>
                            <div className='row account-heading mt-2'>
                                <h3>{state.user.username}</h3>
                            </div>
                            <div className='row account-plans my-4 px-2 shadow shadow-lg border border-light'>
                                <div className='account-plans-header p-4'
                                    onClick={handleShowPlans}>
                                    <h5>MealPlans:</h5>
                                </div>
                                <div className='container' hidden={hidePlans}>
                                    <div className='row mb-4'>{plans}</div>
                                </div>
                            </div>
                            <div className='row account-meals my-4 px-2 shadow shadow-lg border border-light'>
                                <div className='account-meals-header p-4'
                                    onClick={handleShowMeals}>
                                    <h5>Meals:</h5>
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