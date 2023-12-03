import React from 'react';
import {useSelector} from "react-redux";
import RequestSearchForm from "./RequestSearchForm/RequestSearchForm";
import FriendRequestsList from "./FriendRequestsList/FriendRequestsList";


const RequestsPage = ({usersRequestList}) => {
    // Получаем данные из хранилища
    const {isSearchModalOpen} = useSelector((state) => state.messagesReducer);
    return (
        <div>
            <RequestSearchForm isSearchModalOpen={isSearchModalOpen}/>
            <FriendRequestsList usersRequestList={usersRequestList} />
        </div>
    );
};

export default RequestsPage;
