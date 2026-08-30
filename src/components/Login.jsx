import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, {
        withCredentials: true
      });
      dispatch(addUser(res.data))
      navigate("/feed");
    } catch (e) {
      console.error(e?.message);
      setErrorMessage(e?.response?.data || e?.message || "Oops, something went wrong!");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <label className="label" htmlFor="emailId">Email ID</label>
              <input
                type="email"
                id="name"
                className="input"
                value={emailId}
                onChange={(ev) => {
                  setEmailId(ev.target.value)
                }} />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="password">Password</label>
              <input
                type="password"
                id="name"
                className="input"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value)
                }} />
            </fieldset>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;