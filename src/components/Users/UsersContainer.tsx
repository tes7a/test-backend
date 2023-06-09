import React from 'react';
import { connect } from 'react-redux';
import { AppRootStateType } from '../../bll/redux-store';
import {
    getUsers,
    setCurrentPage, setFollow, setUnFollow,
} from '../../bll/users-reducer';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { UserType } from '../../api/api';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import {
    getCurrentPageState, getFollowingInProgressState, getIsFetchingState, getPageSizeState,
    getTotalCountState, getUsersSuperSelector
} from '../../bll/users-selectors';


type MapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
}

type MapDispatchToProps = {
    setCurrentPage: (currentPage: number) => void,
    getUsers:  (currentPage: number, pageSize: number) => void,
    setFollow: (userId: number) => void,
    setUnFollow: (userId: number) => void,
}

type UsersComponentContainerType = MapDispatchToProps & MapStateToPropsType

class UsersComponentContainer extends React.Component<UsersComponentContainerType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    };

    currentPageHandler = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            { this.props.isFetching && <Preloader/>}
            <Users users={ this.props.users }
                   currentPage={ this.props.currentPage }
                   pageSize={ this.props.pageSize }
                   currentPageHandler={ this.currentPageHandler }
                   totalItemsCount={ this.props.totalItemsCount }
                   followingInProgress={ this.props.followingInProgress }
                   setFollow={ this.props.setFollow }
                   setUnFollow={ this.props.setUnFollow }
            />
        </>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeState(state),
        totalItemsCount: getTotalCountState(state),
        currentPage: getCurrentPageState(state),
        isFetching: getIsFetchingState(state),
        followingInProgress: getFollowingInProgressState(state),
    }
};

export default compose<React.ComponentType>(
    connect<MapStateToPropsType , MapDispatchToProps , {}, AppRootStateType>(mapStateToProps, {
        setCurrentPage: setCurrentPage,
        getUsers: getUsers,
        setFollow: setFollow,
        setUnFollow: setUnFollow
    }),
    WithAuthRedirect
)(UsersComponentContainer);