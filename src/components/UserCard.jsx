import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user, hideActions }) => {
  const { photoUrl, firstName, lastName, about, age, gender } = user;
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + `/request/send/${status}/${userId}`, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(userId));
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm my-5">
      <figure>
        <img
          width={200}
          height={200}
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        {age && gender && <p>{age}, {gender}</p>}
        <p>{about}</p>
        {!hideActions && (<div className="card-actions flex justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleRequest("ignored", user._id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleRequest("interested", user._id)}>Interested</button>
        </div>)}
      </div>
    </div>
  )
}

export default UserCard;

