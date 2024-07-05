import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, selectUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";


interface userInterface{
  uid:string,
  email:string,
  name:string,
  photoURL:string,
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser)as userInterface;
  useEffect(() => {
    // Subscribed to onAuthStateChanged
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      console.log('auth', auth);
      
      if (user) {
        // User is signed in        
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, email:email, name:displayName, photoURL:photoURL}));
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }

      // Unsubscrie Auth state changed when component unmounts
      return ()=> unsubscribe()
    });
    return () => {
      
    };
  }, []);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // navigate('/');
    }).catch((error) => {
      navigate('/error');
      console.log(error);
    });
  }
  return (
    <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48"
        src={LOGO}
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
