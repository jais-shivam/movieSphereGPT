import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, selectUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { selectToggleGptSearchView, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


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
  const showGptSearch = useSelector(selectToggleGptSearchView);

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
  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-48"
        src={LOGO}
        alt="logo"
      />

      {user !== null && <div className="flex p-4 gap-4">
        {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
        <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 opacity-80 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search🔍"}
          </button>
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
