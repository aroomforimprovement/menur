import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, FormText, InputGroup, Button } from 'reactstrap';
import { useMainContext } from './Main';

export const MealGen = () => {
    const { state, dispatch } = useMainContext();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIng] = useState([]);


    const handleShowForm = () => {
        setIsFormVisible(true);
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
        console.dir(i);
        if(i.name.length > 0){
            ingr.push(i);
        }
        setIng(ingr);
    }
    const addSuggestion = (e) => {
        const meal = {
            name: name,
            ingredients: ingredients
        }
        dispatch({type: 'ADD_SUGGESTION', data: meal});
    }
    const handleAddAndClose = (e) => {
        addSuggestion(e);
        setIsFormVisible(false);
    }
    const handleAdd = (e) => {
        e.preventDefault();
        addSuggestion(e);
        setName('');
        setIng([]);

    }
    const handleIngredientKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleAddIngredient(e);
        }
    }

    const IngredientField = ({ingredient, i}) => {
        return(
            <div className='container'>
                <div className='row'>
                    <InputGroup onKeyDown={handleIngredientKeyDown}>
                        <Input type='text' id={`ingredient_${i}`} placeholder='Ingredient'
                            defaultValue={ingredient && ingredient.name ? ingredient.name : ''} 
                            className='col col-7'></Input>
                        <Input type='select' id={`type_${i}`} className='col col-3'
                            defaultValue={ingredient && ingredient.type ? ingredient.type : 'fresh'}>
                            <option>fresh</option>
                            <option>dry</option>
                            <option>tin</option>
                            <option>spice</option>
                            <option>cond</option>
                        </Input>
                        <Input type='number' id={`qty_${i}`} placeholder={1}
                            className='col col-2' defaultValue={ingredient && ingredient.qty ? ingredient.qty : 1}></Input>
                    </InputGroup>
                </div>
            </div>
        );
    }

    const ingredientFields = ingredients.map((ingredient, i) => {
        return(
            <IngredientField key={i} ingredient={ingredient} i={i} />
        );
    });

    return(
        <div className='container meal-gen'>
            <div className='btn btn-lg btn-outline-primary fa fa-plus'
                onClick={handleShowForm}>{' '}</div>
            <div hidden={!isFormVisible}>
                <div className='container'>
                    <Label className='mb-1'>Meal name:</Label>
                    <InputGroup size='sm'>
                        <Input type='text' id='name' placeholder='Name'
                            onChange={handleNameChange}
                            defaultValue={name}></Input>
                    </InputGroup>
                    <Label size='sm'>Ingredients</Label>
                    <div id='ingredient-slot'>
                        {ingredientFields}
                    </div>
                    <div >
                        <IngredientField i={ingredients.length} />
                    </div>
                    <div className='btn btn-sm btn-outline-primary fa fa-plus end'
                        onClick={handleAddIngredient}></div>
                    <div className='row'>
                        <button className='btn btn-sm btn-outline-primary col col-4 mx-1'
                            onClick={handleAddAndClose}>Add and close</button>                       
                        <button className='btn btn-sm btn-primary col col-4 mx-1'
                            onClick={handleAdd}>Add and add another</button>
                    </div>
                </div>
            </div>
        </div>
    );
}