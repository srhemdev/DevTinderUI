import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoginForm, setIsLoginForm] = useState(true);

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

  const handleSignUp = async () => {
    setErrorMessage(null)
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        emailId,
        password,
        firstName,
        lastName
      }, {
        withCredentials: true
      });
      if (res.data) {
        setIsLoginForm(true);
        setPassword("");
        setLastName("")
        setFirstName("")
        setEmailId("")
      }
    } catch (e) {
      console.error(e?.message);
      setErrorMessage(e?.response?.data || e?.message || "Oops, something went wrong!");
    }
  }

  return (
    <div className="flex justify-center my-10 p-[76px]">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
          <div>
            {!isLoginForm && (
              <fieldset className="fieldset">
                <label className="label" htmlFor="emailId">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="input"
                  value={firstName}
                  onChange={(ev) => {
                    setFirstName(ev.target.value)
                  }} />
              </fieldset>
            )}
            {!isLoginForm && (
              <fieldset className="fieldset">
                <label className="label" htmlFor="emailId">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="input"
                  value={lastName}
                  onChange={(ev) => {
                    setLastName(ev.target.value)
                  }} />
              </fieldset>
            )}
            <fieldset className="fieldset">
              <label className="label" htmlFor="emailId">Email ID</label>
              <input
                type="email"
                id="emailId"
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
                id="password"
                className="input"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value)
                }} />
            </fieldset>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? 'Login' : 'Sign Up'}</button>
          </div>
          <p className="text-xs cursor-pointer text-center">
            {
              isLoginForm ? <a onClick={() => setIsLoginForm(false)}>New user ? Signup here</a> : <a onClick={() => setIsLoginForm(true)}>Existing User ? Login here</a>
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;