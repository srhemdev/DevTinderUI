
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setErrorMessage(false);
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl
      }, { withCredentials: true });
      dispatch(addUser({ ...user, ...res.data.data }))
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 500);
    } catch (e) {
      setErrorMessage(e.response.data);
    }
  }
  return (
    <div className="flex p-[76px] justify-center">
      <>
        <div className="flex flex-col items-center mx-10">
          <fieldset className="fieldset">
            <label className="label" htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              className="input"
              value={firstName}
              onChange={(ev) => {
                setFirstName(ev.target.value);
              }} />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              className="input"
              value={lastName}
              onChange={(ev) => {
                setLastName(ev.target.value);
              }} />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              className="input"
              value={age}
              onChange={(ev) => {
                setAge(ev.target.value);
              }} />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="about">About:</label>
            <textarea
              rows={5}
              cols={20}
              id="about"
              className="textarea"
              value={about}
              onChange={(ev) => {
                setAbout(ev.target.value);
              }} />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              className="input"
              value={gender}
              onChange={(ev) => {
                setGender(ev.target.value);
              }} />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label" htmlFor="photoUrl">Photo Url:</label>
            <input
              type="text"
              id="photoUrl"
              className="input"
              value={photoUrl}
              onChange={(ev) => {
                setPhotoUrl(ev.target.value);
              }} />
          </fieldset>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div >
        <UserCard user={user} hideActions={true} />
        {errorMessage && (
          <div className="toast toast-top toast-center pt-[76px]">
            <div className="alert alert-error">
              <span>{errorMessage}</span>
            </div>
          </div>)}
        {showToast && (
          <div className="toast toast-top toast-center pt-[76px]">
            <div className="alert alert-success">
              <span>Profile saved successfully!</span>
            </div>
          </div>)}
      </>
    </div>

  )
}

export default EditProfile;