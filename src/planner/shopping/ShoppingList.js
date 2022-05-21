import React from 'react';
import './shopping.scss';
import { useMainContext } from '../../main/MenurRouter';
import { ListDroppable } from './components/ListDroppable';
import { isMobile } from 'react-device-detect';
import toast from 'buttoned-toaster';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { DownloadableShoppingList } from '../../utils/pdfUtils';

export const ShoppingList = () => {

    const { state, dispatch } = useMainContext();
    
    function copyToClipboard(textToCopy) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            return navigator.clipboard.writeText(textToCopy);
        } else {
            // text area method
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                // here the magic happens
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
            });
        }
    }
    const getListText = (list, heading) => {
        let text = heading+"\n\n";
        list.forEach(item => {
            text += item.name + "\tx " + item.qty + "\n";
        });
        return text;
    }
    const copyList = async (list, heading) => {
        let copy = getListText(list, heading);
        copyToClipboard(copy)
            .then(() => {
                toast.success(`${heading} copied to clipboard`);    
                console.debug('copied')
            })
            .catch((err) => console.debug('error'));
    }
    
    const downloadList = async (list, heading) => {
        let listText = getListText(list, heading);
        const setIsCancelled = (id) => {
            toast.dismiss(id);
        }
        const downloadText = (id) => {
            const blob = new Blob([listText], {type: 'text/plain;charset=utf-8'});
            saveAs(blob, `Shopping List ${Date.now().toString()}`);
            toast.dismiss(id);
        }
        const downloadPdf = async (id) => {
            const blob = await pdf(DownloadableShoppingList({list:list, heading:heading})).toBlob();
            saveAs(blob, `Shopping List ${Date.now()}`);
            toast.dismiss(id);
        }

        toast.info(
            { 
                toastId: "DownloadOptions",
                message: `Would you like download this list as a text file or a pdf?`,
                dismissTxt:'Cancel',
                dismissFunc: setIsCancelled,
                moreOptions: [
                    {
                        handler: downloadText,
                        btnText: "Text",
                    }, 
                    {
                        handler: downloadPdf,
                        btnText: "PDF",
                    }
                ],
            }
        );
    }

    
    const addList = (list, heading, index) => {
        //modal stuff
        dispatch({
            type: 'SHOW_LIST_CREATOR', 
            data: {
                list: list, 
                heading: heading, 
                index: index, 
                showListCreator: true
            }});
        const element = document.getElementById(`userList_${index}`);
        element ? element.scrollIntoView() : console.log();
    }


    const ListTemplate = ({list, title, tag, copyFunc, downloadFunc, addFunc}) => {

        return(
            <div className={`gen-list mt-2 border border-2 shadow shadow-sm ${isMobile ? 'col col-12' : 'col col-12 col-md-6 col-xl-4'} mx-auto px-1`}>
                <div className='row mb-1 pt-2'>
                    <h6 className='list-heading col mt-1'>{title}</h6>
                    <div className='col col-1 col-md-2 col-lg-1 me-4'>
                        <button className='btn btn-sm btn-outline-info copy-btn mb-2 bg-light'
                            onClick={downloadFunc}>
                            <span className='fa fa-download fa-xs'>{' '}</span>
                        </button>
                    </div>
                    <div className='col col-1 col-md-2 col-lg-1 me-4'>
                        <button className='btn btn-sm btn-outline-info copy-btn mb-2 bg-light'
                            onClick={copyFunc}>
                            <span className='fa fa-copy fa-xs'>{' '}</span>
                        </button>
                    </div>
                    <div className='col col-1 col-md-2 col-lg-1 me-4'>
                        <button className='btn btn-sm btn-outline-info copy-btn mb-2 bg-light'
                            onClick={addFunc}>
                            <span className='fa fa-plus fa-xs'>{' '}</span>
                        </button>
                    </div>
                </div>
                <ListDroppable  list={list} tag={tag}/>
            </div>
        );
    }

    const userLists = state.userLists ? state.userLists.map((list, i) => {
        return(
            <ListTemplate key={i} 
                id={`userList_${i}`}
                list={list.list} 
                title={list.heading} 
                tag={`userList_${i}`}
                copyFunc={() => copyList([list.list], list.heading)}
                downloadFunc={() => downloadList(list.list, list.heading)}
                addFunc={() => addList(list.list, list.heading, i)} />
        )
    }) : <div></div>

    return(
        <div>
            { (state.genList && state.genList.list && state.genList.list.length > 0) || (state.userLists && state.userLists.length > 0)
            ? <div style={{display:'flex', flexWrap:'wrap', alignItems:'center'}} className='col col-12 mt-3 mb-5'> 
                <ListTemplate 
                    list={state.genList.list} 
                    title='Shopping list' tag='genList'
                    copyFunc={() => copyList([...state.genList.list], "GENERATED LIST")} 
                    downloadFunc={() => downloadList([...state.genList.list], "GENERATED LIST")}
                    addFunc={() => addList([...state.genList.list], "MENUR Generated Shopping List", -1)}/>
                    {userLists}
            </div>
            : <div></div>}
        </div>
    );
}