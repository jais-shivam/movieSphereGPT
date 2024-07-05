import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidDataSignUp } from "../utils/validations";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInform, setIsSignInform] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>('');
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInform(!isSignInform);
  }
  const handleButtonClick = () => {
    // Validate the form data
    const msg = isSignInform ? checkValidData(email?.current!.value, password?.current!.value) : checkValidDataSignUp(name?.current!.value, email?.current!.value, password?.current!.value)
    // console.log(name?.current!.value);

    setErrorMsg(msg);

    if (msg) return;

    // SignUp & signIn logic
    if (!isSignInform) {
      console.log(auth, email?.current!.value, password?.current!.value);

      createUserWithEmailAndPassword(auth, email?.current!.value, password?.current!.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current!.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser!;
            dispatch(addUser({ uid: uid, email: email, name: displayName, photoURL: photoURL }));
            // navigate('/browse');
          }).catch((error) => {
            // An error occurred
            setErrorMsg(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + ' - ' + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(auth, email?.current!.value, password?.current!.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // navigate('/browse');

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + ' - ' + errorMessage);
        });
    }

  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className=""
          src={BG_URL}
          alt=""
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute px-10 py-8 bg-black mx-auto right-0 left-0 my-20 text-white rounded-md bg-opacity-80">
        <h1 className=" font-bold text-3xl py-4">{isSignInform ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInform && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full rounded-md bg-transparent border border-gray-700" />}
        <input ref={email} type="email" placeholder="Email Address" className="p-4 my-4 w-full rounded-md bg-transparent border border-gray-700" />
        <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full rounded-md bg-transparent border border-gray-700" />
        <p className="text-red-500 font-bold text-md">{errorMsg}</p>
        <button className="p-4 my-4 cursor-pointer bg-red-700 w-full rounded-md" onClick={handleButtonClick}>{isSignInform ? 'Sign In' : 'Sign Up'}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInform ? 'Already registered? Sign In' : 'New to Netflix? Sign Up Now'}</p>
      </form>
    </div>
  );
};

export default Login;
