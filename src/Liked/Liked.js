import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./LikedSlice";

export default function Liked() {
    const { likedUsers } = useSelector((state) => state.liked);
    const dispatch = useDispatch();
    const onRemoveLikedUser = (user) => {
        dispatch(actions.removeFromLiked(user.id));
    }
    return <div className="Liked">
        {!likedUsers.length ?
            <div className="container text-center">No liked</div>:
            <ul className="list-group list-group-flush">
            {likedUsers.map(user => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return <li key={user.id}
                    className="list-group-item d-flex justify-content-between align-items-center">
                    <img className="Avatar" src={user.picture} alt={fullName} width="50" height="50"/>
                    <div className="d-flex flex-column flex-grow-1 pl-3 pr-3">
                        <p className="text-left mb-0">{fullName}</p>
                        <p className="text-left mb-0">Gender: {
                        `${user.title === 'mr' ? 'Male': 'Female'}`}</p>
                    </div>
                    <Button onClick={() => onRemoveLikedUser(user)} className="btn-danger">
                        <Trash/>
                    </Button>
                </li>
        })}
        </ul>}
  </div>
}