import React from 'react';
import { useMainContext } from './Main';
import { UserList } from './UserList';

export const GenList = () => {

    const { state } = useMainContext();
    
    return(
        <div className='row'>
        <div className='gen-list col-4 mt-2'>
            <div>
                <h6 >Generated Shopping List</h6>
                <UserList list={"genList"} />
            </div>
        </div>
        <div className='gen-list col-4 mt-2'>
            <h6 >List 1</h6>
            <UserList list={"userList1"}/>
        </div>
        <div className='gen-list col-4 mt-2'>
            <h6 >List 2</h6>
            <UserList list={"userList2"} />
        </div>
        <div className='divider mb-3'></div>
        </div>
    );
}