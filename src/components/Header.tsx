import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
    }).catch((error) => {
      navigate('/error');
      console.log(error);
    });
  }
  return (
    <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />

      {user !== null && <div className="flex p-4 gap-4">
        <img
          className="w-12 h-12 rounded-lg"
          src={user?.photoURL}
          alt="user icon"
        />
        <button onClick={handleSignOut} className="text-white font-bold">Sign out</button>
      </div>}
    </div>
  );
};

export default Header;
