import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import './mealgen.scss';
import { useMainContext } from '../../../main/MenurRouter';
import { getNewId } from '../../../utils/objUtils';
import { toast } from 'react-hot-toast';

export const MealGen = () => {
    const { state, dispatch } = useMainContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIng] = useState([]);
    const [servings, setServings] = useState(2);
    const apiUrl = process.env.REACT_APP_API_URL;
    let proxy = process.env.REACT_APP_PROXY_URL;

    const handleShowForm = () => {
        setIsFormVisible(!isFormVisible);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleAddIngredient = (e) => {
        const nameField = document.getElementById(`ingredient_${ingredients.length}`);
        const typeField = document.getElementById(`type_${ingredients.length}`);
        const qtyField = document.getElementById(`qty_${ingredients.length}`); 
        let ingr = [...ingredients];
        const type = typeField.value
        let score = 0;
        if(type === 'fresh'){
            score = 4;
        }else if(type === 'tin'){
            score = 2;
        }else if(type === 'dry'){
            score = 3;
        }else if(type === 'cond' || type === 'spice'){
            score = 0;
        }
        let i = {name: nameField.value, type: type, qty: qtyField.value, score: score};
        if(i.name.length > 0){
            ingr.push(i);
            toast(`Ingredient added to new meal ${name}`);
        }
        setIng(ingr);
        
    }
    const addSuggestion = (e) => {
        e.preventDefault();
        const meal = {
            name: name,
            ingredients: ingredients,
            servings: servings
        }
        dispatch({type: 'ADD_SUGGESTION', data: meal});
    }
    

    const saveMeal = async () => { 
        const id = getNewId();
        const body = {
            userid: state.user.userid,
            meal: {
                id: id,
                name: name,
                ingredients: ingredients,
                servings: servings
            }
        }
        return await fetch(`${proxy}${apiUrl}app/meal`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${state.user.access}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.ok){
                dispatch({type: 'ADD_SELECTOR_MEAL', data: body.meal});
                toast.success("Meal saved ok");
                return id;
            }else{
                console.error(`response not ok`);
                toast.error("Error saving the meal");
            }
        }, error => {
            console.error(error);
            return false;
        }).catch((error) => {console.error(error)});
    }
    const handleAdd = (e) => {
        e.preventDefault();
        if(name && name !== ''){
            addSuggestion(e);
            setName('');
            setIng([]);
        }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        if(name && name !== ''){
            await saveMeal();
            addSuggestion(e);
            setName('');
            setIng([]);
        }
    }
    const handleIngredientKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleAddIngredient(e);
        }
    }
    const handleServingsChange = (e) => {
        setServings(e.target.value);
    }

    const IngredientField = ({ingredient, i}) => {
        return(
            <div className='container p-0'>
                <InputGroup size='sm' onKeyDown={handleIngredientKeyDown} className='row'>
                    <FormControl size='sm' type='text' id={`ingredient_${i}`} placeholder='Ingredient'
                        defaultValue={ingredient && ingredient.name ? ingredient.name : ''} 
                        className='w-50'></FormControl>
                    
                    <Form.Select size='sm' type='select' id={`type_${i}`} 
                        defaultValue={ingredient && ingredient.type ? ingredient.type : 'fresh'}>
                        <option>fresh</option>
                        <option>dry</option>
                        <option>tin</option>
                        <option>spice</option>
                        <option>cond</option>
                    </Form.Select>
                    <FormControl size='sm' type='number' id={`qty_${i}`} placeholder={1}
                        defaultValue={ingredient && ingredient.qty ? ingredient.qty : 1}></FormControl>
                </InputGroup>
            </div>
        );
    }

    const ingredientFields = ingredients.map((ingredient, i) => {
        return(
            <div key={i}><p>{ingredient.name} x{ingredient.qty} ({ingredient.type})</p></div>
            //<IngredientField key={i} ingredient={ingredient} i={i} />
        );
    });

    let showFormClasses = ''

    return(
        <div className='container meal-gen shadow shadow-lg p-0 mt-3 mb-3'>
            <div hidden={true} >{isFormVisible ? showFormClasses = ' fa-caret-up' : showFormClasses = 'fa-caret-right'}</div>
            <div className='col col-12 meal-gen-toggle border border-1 rounded-3'>
                <div className='butt butt-standard col col-12 meal-gen-toggle-btn pt-2'
                    onClick={handleShowForm} text='Create a new meal'>
                        <div className={`fa fa-lg ${showFormClasses} ms-2`}>{' '}</div>
                        <h6 style={{display:'inline-block'}}className={'ms-3'}>{isFormVisible ? 'Close meal creation' : 'Create a new meal'}</h6>
                        
                </div>
            </div>
            <div hidden={!isFormVisible} className={isFormVisible ? 'meal-gen-in' : 'meal-gen-out'} > {/*hidden={!isFormVisible} >*/}
                <div className='container meal-gen-container'>
                    <Form.Label className='mb-1 mt-2'>
                        <h6>Meal name:</h6>
                    </Form.Label>
                    <InputGroup size='sm'>
                        <FormControl type='text' id='name' placeholder='Meal name'
                            onChange={handleNameChange}
                            value={name}></FormControl>
                    </InputGroup>
                    <div className='row mt-2'>
                        <div className='col col-12'>
                            <InputGroup size='sm' >
                                <Form.Label size='sm' htmlFor='servings' className='col col-8'>
                                    <strong>Servings:</strong>
                                </Form.Label>
                                <FormControl type='number' id='servings' defaultValue={2}
                                    onChange={handleServingsChange} size="sm"
                                    className='col col-5 ps-2 w-25'></FormControl>
                                <small>{`${state.defaultServings} servings + ${servings - state.defaultServings} leftovers`}</small>
                            </InputGroup>
                        </div>
                    </div>
                    <Form.Label size='sm' className='mt-2'>
                        <h6>Ingredients:</h6>
                        <small>Use | character to separate options, like "Fresh tomatoes|Canned tomatoes", if either will do</small>
                    </Form.Label>
                    <div id='ingredient-slot'>
                        {ingredientFields}
                    </div>
                    <div className='row'>
                        <div className='col col-11 me-0'>
                            <IngredientField i={ingredients.length} />
                        </div>
                        <div className='col col-1 butt butt-standard-outline fa fa-plus my-1 py-1 mx-0'
                                onClick={handleAddIngredient}>{' '}
                        </div>
                        
                    </div>
                    <div className='row ing-row pb-3'>
                        <div className='col col-3'></div>                       
                        <button className='butt butt-standard col col-12 mx-1 mt-3'
                            onClick={handleAdd}>Add new meal to suggestions</button>
                        {state && state.user && state.user.isAuth ?
                            <button className='btn btn-sm btn-success col col-12 mx-1 mt-1 mb-3'
                            onClick={handleSave}>Save new meal to account</button> : <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}