import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions as homeActions } from './HomeSlice';
import { actions as likedActions } from '../Liked/LikedSlice';
const REMAINING_USERS_TO_FETCH_NEW = 2;
const DISTANCE_TO_BE_DEFINED_AS_SWIPE_IN_PX = 30;
const appId = '603b55f97c32a54aa4315628';
export default function Home() {
    const {users, userIdToDetailMap, currentUserIndex, page } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const [touchPosStart, setTouchPos] = useState(0);
    useEffect(() => {
        fetch(`https://dummyapi.io/data/api/user?limit=10&page=${page}`, {
            headers: { "app-id": appId }
        })
        .then(response => response.json())
        .then(json => {
            const fetchedUsers = json.data;
            dispatch(homeActions.setUsers(fetchedUsers));
        });
    }, [page]);
    useEffect(() => {
        if(users.length === 0) { return; }
        if(currentUserIndex === 0) {
            if(userIdToDetailMap[users[0].id]) {
                return;
            }
            fetchAndAddUserDetailToMapById(users[0].id);
        }
        const nextIndexToFetch = currentUserIndex + 1;
        if(nextIndexToFetch === users.length
            || userIdToDetailMap[users[nextIndexToFetch]?.id]) { return; }
        // Fetch and add next
        fetchAndAddUserDetailToMapById(users[nextIndexToFetch].id);
    }, [currentUserIndex, users]);
    const fetchAndAddUserDetailToMapById = (id) => {
        fetch(`https://dummyapi.io/data/api/user/${id}`,{
            headers: { "app-id": appId }
        })
        .then(response => response.json())
        .then(userDetail => {
            dispatch(homeActions.setUserIdToDetailMap(userDetail));
        });
    };
    const onDislike = () => {
        moveToNextUser();
    };
    const onLike = () => {
        dispatch(likedActions.liked(users[currentUserIndex]));
        moveToNextUser();
    };
    const moveToNextUser = () => {
        if(currentUserIndex === users.length - 1 - REMAINING_USERS_TO_FETCH_NEW) {
            dispatch(homeActions.setPage(page + 1));
        }
        dispatch(homeActions.setUserToNext());
    };
    const onImageTouchStart = (event) => {
        setTouchPos(event.touches[0].clientX);
    };
    const onImageTouchEnd = (event) => {
        if(currentUserIndex >= users.length - 1) { return; }
        if(event.changedTouches[0].clientX - touchPosStart > DISTANCE_TO_BE_DEFINED_AS_SWIPE_IN_PX) {
            onLike();
        }
        else if(event.changedTouches[0].clientX - touchPosStart
            < -DISTANCE_TO_BE_DEFINED_AS_SWIPE_IN_PX) {
            onDislike();
        }
    };
    const renderCurrentUser = () => {
        const currentUser = users[currentUserIndex];
        const displayName = `${currentUser.firstName} ${currentUser.lastName}`;
        const currentUserDetail = userIdToDetailMap[currentUser.id];
        const userAge = !currentUserDetail ? 'Loading':
            (new Date().getFullYear() - new Date(currentUserDetail.dateOfBirth).getFullYear());
        const actionButtonDisabled = currentUserIndex >= users.length - 1;
        return <div className="card border-0 h-100 d-flex pt-3">
        <img className="card-img-top" src={currentUser.picture} alt={displayName}
            onTouchStart={onImageTouchStart}
            onTouchEnd={onImageTouchEnd}/>
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{displayName}</h5>
            <p className="card-text flex-grow-1">{userAge}</p>
          
            <div className="d-flex Home__Actions">
                <Button className="w-100 btn-danger"
                    disabled={actionButtonDisabled}
                    onClick={onDislike}>Dislike</Button>
                <Button className="w-100 btn-success" 
                    disabled={actionButtonDisabled}
                    onClick={onLike}>Like</Button>
            </div>  
        </div>
      </div>;
    }
    return !users[currentUserIndex] ? <div className="text-center">Loading...</div>
    : renderCurrentUser()
}