import React, { useReducer, useContext, createContext } from 'react';
import { Header, Footer } from './Header';
import { INIT_STATE } from '../shared/states';
import { Selector } from './Selector';
import { Suggestions } from './Suggestions';
import { reducer } from '../redux/Main';
import { MealPlan } from './MealPlan';
import { GenList } from './GenList';

const MainContext = createContext(INIT_STATE);

export const useMainContext = () => {
    return useContext(MainContext);
}

export const Main = () => {

    const [state, dispatch] = useReducer(reducer, window.localStorage.getItem('MENUR_STATE') 
        ? JSON.parse(window.localStorage.getItem('MENUR_STATE')) : INIT_STATE);
    const mainState = { state, dispatch };

    const handleGenList = () => {
        dispatch({type: 'GEN_LIST', data:true});
    }
    return(
        <div>
            <MainContext.Provider value={mainState}>
                <MainContext.Consumer>
                    {() => (
                        <div>
                        <Header />
                        <div className='container mt-3'>
                            <div className='row'>
                                <Selector />
                                <Suggestions />                        
                            </div>
                            <div className='row'>
                                <MealPlan />
                            </div>
                            <div className='row mt-2 mb-2'>
                                <button onClick={handleGenList} 
                                    className='shadow btn btn-warning border border-success col col-12'>
                                    Generate shopping list (if you make changes to the meal plan, you'll have to do this again)
                                </button>
                            </div>
                            <div className='row'>
                                <GenList className='col col-3'/>
                            </div>
                        </div>
                       <Footer className='footer'/>
                    </div>
                    )}
                </MainContext.Consumer>
                
            </MainContext.Provider>
        </div>
    );
}