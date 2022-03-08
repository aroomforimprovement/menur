import React, { useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useMainContext } from '../../main/MenurRouter';
import { DownloadableMealPlan, DownloadableMealPlanLandscape,  MultipleShoppingLists, GetSingleShoppingList } from '../../utils/pdfUtils';
import toast from 'react-hot-toast';
import { toastConfirmStyle, ToastOptions } from '../../common/Toasts';
import PDFMerger from 'pdf-merger-js';

export const DownloadMealPlan = () => {
    const { state, dispatch } = useMainContext();
    
    useEffect(() => {
        const download = async () => {
            const mealplanBlob = await pdf(
                state.isLandscape 
                ? DownloadableMealPlanLandscape({mealplan: state.mealplan})
                : DownloadableMealPlan({mealplan: state.mealplan})).toBlob();
            const shoppingListBlob = await GetSingleShoppingList({list: state.genList, heading: "GENERATED LIST"});
            const merger = new PDFMerger();
            await merger.add(mealplanBlob);
            await merger.add(shoppingListBlob);
            
            const blob = await merger.saveAsBlob();
            blob instanceof Blob
                ? saveAs(blob, `Menur Plan - ${state.mealplan.name ? state.mealplan.name : Date.now()}`)
                : console.warn("no blob");
            dispatch({type: 'SET_IS_GENERATING_LIST', data: {isGenerating: false, mealplanDownloading: null}});
        }
        if(state.isGeneratingList){
            if(state.genList && state.genList.length > 0){
                download();
                
            }
        }
    }, [state.isGeneratingList, state.genList, state.isLandscape, state.mealplan, dispatch]);

    const handleDownload = async () => {
        const cancel = (id) => {
            toast.dismiss(id);
        }
        const downloadWithShoppingList = async (id) => {
            const lists = [];
            if(state.genList.length > 0){
                lists.push({list: state.genList, heading: "GENERATED LIST"});
            }
            if(state.userList1.length > 0){
                lists.push({list: state.userList1, heading: "LIST 1"});
            }
            if(state.userList2.length > 0){
                lists.push({list: state.userList2, heading: "LIST 2"});
            }
            if(lists.length === 0){
                dispatch({type: 'SET_IS_GENERATING_LIST', data: {isGenerating: true, mealplanDowloading: state.mealplan.id}});
                dispatch({type: 'GEN_LIST', data:{main: true, mealplan: state.mealplan}});
                state.genList && state.genList.length > 0
                ? lists.push({list: state.genList, heading: "GENERATED LIST"}) 
                : console.warn("no shopping lists generated");
            }else{
                const mealplanBlob = await pdf(
                    state.isLandscape 
                    ? DownloadableMealPlanLandscape({mealplan: state.mealplan})
                    : DownloadableMealPlan({mealplan: state.mealplan})).toBlob();
                const shoppingListBlobs = await MultipleShoppingLists({lists: lists});
                const merger = new PDFMerger();
                await merger.add(mealplanBlob);
                for(const blob in shoppingListBlobs) {
                    await merger.add(shoppingListBlobs[blob]);
                };
                const blob = await merger.saveAsBlob();
                blob instanceof Blob
                    ? saveAs(blob, `Menur Plan - ${state.mealplan.name ? state.mealplan.name : Date.now()}`)
                    : console.warn("no blob");
            }
            
            toast.dismiss(id);
        }


        const downloadWithoutShoppingList = async (id) => {
            const blob = await pdf(
                state.isLandscape 
                ? DownloadableMealPlanLandscape({mealplan: state.mealplan})
                : DownloadableMealPlan({mealplan: state.mealplan})).toBlob();
            saveAs(blob, `Menur Plan - ${state.mealplan.name ? state.mealplan.name : Date.now()}`)
            toast.dismiss(id);
        }

        toast((t) => (
            <ToastOptions t={t} dismiss={cancel} options={[downloadWithShoppingList, downloadWithoutShoppingList]}
            optionBtns={["With", "Without"]} dismissBtn={'Cancel'} 
            message={'Would you like to download the meal plan with your shopping list(s) attached?'} />
        ), toastConfirmStyle());
    }

    return(
        <div>
            <button onClick={handleDownload} 
                className={'butt butt-good shadow my-1 col col-11 mb-2 mx-auto'} style={{display:'inline-block'}}>
                <span className={'fa fa-lg fa-download me-2'}>{' '}</span>
                    Download Meal Plan
                <span className={'fa fa-lg fa-download ms-2'}>{' '}</span>
            </button>
        </div>
    )
}