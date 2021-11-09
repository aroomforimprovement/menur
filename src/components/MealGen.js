import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useMainContext } from './MenurRouter';
import { getNewId } from '../utils/objUtils';
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
        let i = {name: nameField.value, type: typeField.value, qty: qtyField.value};
        //console.dir(i);
        if(i.name.length > 0){
            ingr.push(i);
        }
        setIng(ingr);
    }
    const addSuggestion = (e) => {
        e.preventDefault();
        console.log("addSuggestion");
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
                console.log(`meal saved ok`);
                dispatch({type: 'ADD_SELECTOR_MEAL', data: body.meal});
                toast("Meal saved ok");
                return id;
            }else{
                console.error(`response not ok`);
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
        console.log(e.target.value);
        setServings(e.target.value);
    }

    const IngredientField = ({ingredient, i}) => {
        return(
            <div className='row'>
                <InputGroup onKeyDown={handleIngredientKeyDown} className='col col-12'>
                    <FormControl type='text' id={`ingredient_${i}`} placeholder='Ingredient'
                        defaultValue={ingredient && ingredient.name ? ingredient.name : ''} 
                        className='col col-sm-9 col-7'></FormControl>
                    <Form.Select type='select' id={`type_${i}`} className='col col-sm-2 col-2'
                        defaultValue={ingredient && ingredient.type ? ingredient.type : 'fresh'}>
                        <option>fresh</option>
                        <option>dry</option>
                        <option>tin</option>
                        <option>spice</option>
                        <option>cond</option>
                    </Form.Select>
                    <FormControl type='number' id={`qty_${i}`} placeholder={1}
                        className='col col-sm-1 col-1' defaultValue={ingredient && ingredient.qty ? ingredient.qty : 1}></FormControl>
                </InputGroup>
            </div>
        );
    }

    const ingredientFields = ingredients.map((ingredient, i) => {
        return(
            <IngredientField key={i} ingredient={ingredient} i={i} />
        );
    });

    let showFormClasses = ''

    return(
        <div className='container meal-gen shadow shadow-sm pb-3 mt-3 mb-3'>
            <div hidden={true}>{isFormVisible ? showFormClasses = 'fa-caret-up' : showFormClasses = 'fa-caret-down'}</div>
            <div className='col col-12 meal-gen-toggle'>
                <div className='btn btn-sm btn-outline-primary fa fa-plus col col-12 mel-gen-toggle-btn'
                    onClick={handleShowForm}>
                    <span className={`fa ${showFormClasses} ms-3`}>{' '}</span>
                </div>
            </div>
            <div hidden={!isFormVisible}>
                <div className='container'>
                    <Form.Label className='mb-1'>Meal name:</Form.Label>
                    <InputGroup size='sm'>
                        <FormControl type='text' id='name' placeholder='Name'
                            onChange={handleNameChange}
                            value={name}></FormControl>
                    </InputGroup>
                    <div className='row meal-gen-left mt-1'>
                        <div className='col col-5'>
                            <InputGroup size='sm'>
                                <Form.Label htmlFor='servings' className='me-4 mt-2'>Servings:</Form.Label>
                                <FormControl type='number' id='servings' defaultValue={2}
                                    onChange={handleServingsChange} 
                                    className='col col-1 ms-8'></FormControl>
                            </InputGroup>
                        </div>
                    </div>
                    <Form.Label size='sm' className='mt-2'>Ingredients</Form.Label>
                    <div id='ingredient-slot'>
                        {ingredientFields}
                    </div>
                    <div className='row'>
                        <div className='col col-12'>
                            <IngredientField i={ingredients.length} />
                        </div>
                        <div className='col col-1 btn btn-outline-primary btn-sm fa fa-plus'
                            onClick={handleAddIngredient}>
                        </div>
                    </div>
                    <div className='row ing-row'>
                        <div className='col col-3'></div>                       
                        <button className='btn btn-sm btn-primary col col-12 mx-1 mt-3'
                            onClick={handleAdd}>Add new meal to suggestions</button>
                        {state && state.user && state.user.isAuth ?
                            <button className='btn btn-sm btn-success col col-12 mx-1 mt-1'
                            onClick={handleSave}>Save new meal to account</button> : <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}