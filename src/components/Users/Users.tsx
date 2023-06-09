import React from 'react';
import { UserType } from '../../api/api';
import { Pagination } from './Pagination/Pagination';
import { User } from './User';

type UsersComponentType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    users: UserType[],
    currentPageHandler: (pageNumber: number) => void,
    followingInProgress: number[],
    setFollow: (userId: number) => void,
    setUnFollow: (userId: number) => void,
}

export const Users: React.FC<UsersComponentType> = ({
    currentPage,
    currentPageHandler,
    followingInProgress,
    pageSize,
    setFollow,
    setUnFollow,
    totalItemsCount,
    users,
}) => {
    return <div>
       <Pagination 
            currentPage={currentPage}
            currentPageHandler={currentPageHandler}
            pageSize={pageSize}
            totalItemsCount={totalItemsCount}
            portionSize={10}
         />
        {
            users.map(u =><User 
                followingInProgress={followingInProgress}
                setFollow={setFollow}
                setUnFollow={setUnFollow}
                users={u}
                key={u.id}
                />)
        }
    </div>
}