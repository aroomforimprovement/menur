import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { useMainContext } from '../../main/MenurRouter';
import { DownloadableMealPlan, DownloadableMealPlanLandscape,  MultipleShoppingLists } from '../../utils/pdfUtils';
import toast from 'react-hot-toast';
import { toastConfirmStyle, ToastOptions } from '../../common/Toasts';
import PDFMerger from 'pdf-merger-js';

export const DownloadMealPlan = () => {
    const { state, dispatch } = useMainContext();


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
                dispatch({type: 'GEN_LIST', data:true});
                state.genList 
                ? lists.push({list: state.genList, heading: "GENERATED LIST"}) 
                : console.warn("no shopping lists generated");
            }
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
                <span className={'fa fa-lg fa-download'}>{' '}</span>
                    Download Meal Plan
                <span className={'fa fa-lg fa-download'}>{' '}</span>
            </button>
        </div>
    )
}