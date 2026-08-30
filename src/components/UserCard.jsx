const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, age, gender } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-5">
      <figure>
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        {age && gener && <p>{age}, {gender}</p>}
        <p>{about}</p>
        <div className="card-actions flex justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard;

