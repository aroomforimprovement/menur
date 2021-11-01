import React from 'react';
import { useMainContext } from './MenurRouter';
import { UserList } from './UserList';

export const GenList = () => {

    const { state } = useMainContext();
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
    const copyList = async (list, heading) => {
        let copy = heading+"\n";
        list.forEach(item => {
            //console.dir(item);
            copy += item.name + "\tx " + item.qty + "\n";
        });
        copyToClipboard(copy)
            .then(() => console.log('copied'))
            .catch(() => console.log('error'));
    }
    const copyGenList = () => {
        copyList([...state.genList], "GENERATED LIST");
    }
    const copyUserList1 = () => {
        copyList([...state.userList1], "LIST 1");
    }
    const copyUserList2 = () => {
        copyList([...state.userList2], "LIST 2");
    }

    return(
        <div className='row'>
        <div className='gen-list col-4 mt-2'>
            <div>
                <h6 className='list-heading'>Generated Shopping List</h6>
                <button className='btn btn-sm btn-outline-info copy-btn'
                    onClick={copyGenList}>
                    <span className='fa fa-copy'>{' '}</span>
                </button>
                <UserList list={"genList"} />
            </div>
        </div>
        <div className='gen-list col-4 mt-2'>
            <h6 className='list-heading'>List 1</h6>
            <button className='btn btn-sm btn-outline-info copy-btn'
                onClick={copyUserList1}>
                <span className='fa fa-copy'>{' '}</span>
            </button>
            <UserList list={"userList1"}/>
        </div>
        <div className='gen-list col-4 mt-2'>
            <h6 className='list-heading'>List 2</h6>
            <button className='btn btn-sm btn-outline-info copy-btn'
                onClick={copyUserList2}>
                <span className='fa fa-copy'>{' '}</span>
            </button>
            <UserList list={"userList2"} />
        </div>
        <div className='divider mb-3'></div>
        </div>
    );
}