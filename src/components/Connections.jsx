import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
      setConnections(res.data.data);
    } catch (e) {
      console.error(e.message);
    }
  }
  useEffect(() => {
    fetchConnections();
  }, [])
  if (!connections) return;
  if (connections.length === 0) return <h1>No connections found</h1>
  return (
    <div className="flex flex-col items-center justify-center p-[80px]">
      <h1 className="text-bold text-3xl">Connections</h1>
      {connections.map((item) => (
        <UserCard user={item} hideActions={true} />
      ))}
    </div>
  );
}

export default Connections;