import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData, checkValidDataSignUp } from "../utils/validations";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInform, setIsSignInform] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>('');
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
            photoURL: "https://media.licdn.com/dms/image/D4D03AQE1aVjMmMNdwg/profile-displayphoto-shrink_400_400/0/1695465908397?e=1725494400&v=beta&t=NznuepNu-8dyx7iE59TV2dyJtdkkhRrgvCQwEFw0fSU",
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, name: displayName, photoURL: photoURL }));
            navigate('/browse');
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
          navigate('/browse');

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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_small.jpg"
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
