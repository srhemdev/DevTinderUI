import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/requests/received`, { withCredentials: true })
      setRequests(res.data.data);
    } catch (e) {
      console.error(e.message);
    }
  }
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(BASE_URL + `/request/review/${status}/${requestId}`, {}, { withCredentials: true })
      if (res.data) {
        await fetchRequests();
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, [])
  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center p-[80px]">No requests found</h1>
  return (
    <div className="flex flex-col items-center justify-center p-[80px]">
      <h1 className="text-bold text-3xl">Requests</h1>
      <>
        {requests.map((item) => {
          const { photoUrl, age, about, gender, firstName, lastName, _id } = item.fromUserId;
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
                <div className="card-actions flex justify-center my-4">
                  <button className="btn btn-primary" onClick={() => reviewRequest("rejected", item._id)}>Reject</button>
                  <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", item._id)}>Accept</button>
                </div>
              </div>
            </div>
          )
        })
        }</>
    </div>
  );
}

export default Requests;