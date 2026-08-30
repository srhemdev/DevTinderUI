import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (e) {
      if (e.status === 401) {
        navigate("/login");
      }
      console.error(e);
    }
  }
  useEffect(() => {
    if (user) return;
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <div className="flex flex-col">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;