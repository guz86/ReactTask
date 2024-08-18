import { useAppSelector } from '../../app/store';

export const Main = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div>
      <h1>Main Page</h1>

      <>
        {user.name && user.age && user.email ? (
          <div className="uncontrolled">
            <h2>Uncontrolled Form Data</h2>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Gender: {user.gender}</p>
            <p>Terms accepted: {user.termsAccepted.toString()}</p>
            <img
              src={user.profilePicture}
              alt="User Avatar"
              style={{ width: '150px', height: '150px' }}
            />
            <p>Country: {user.selectedCountry}</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </>
    </div>
  );
};
