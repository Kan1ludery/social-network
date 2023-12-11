import React from 'react';
import RequestSearchForm from "./RequestSearchForm/RequestSearchForm";
import FriendRequestsList from "./FriendRequestsList/FriendRequestsList";


const RequestsPage = ({usersRequestList, isSearchModalOpen}) => {

    // Получаем данные из хранилища
    return (
        <div>
            <RequestSearchForm isSearchModalOpen={isSearchModalOpen}/>
            <FriendRequestsList usersRequestList={usersRequestList} />
        </div>
    );
};

export default RequestsPage;
