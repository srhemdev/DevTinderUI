import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      axios.post("http://localhost:3000/login", {
        emailId,
        password
      }, {
        withCredentials: true
      });
    } catch (e) {
      console.error(e);
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
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;