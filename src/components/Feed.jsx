import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (e) {
      console.error(e?.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if (feed?.length === 0) return <h1 className="flex justify-center p-[80px]">No new users found</h1>

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-[76px]">
      {feed?.map(item => <UserCard key={item._id} user={item} />)}
    </div>
  );
}

export default Feed;