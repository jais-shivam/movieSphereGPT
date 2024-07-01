import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInform, setIsSignInform] = useState(true);

  const toggleSignInForm = ()=>{
    setIsSignInform(!isSignInform);
  }
  const handleButtonClick = ()=>{
    
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
      <form className="w-3/12 absolute px-10 py-8 bg-black mx-auto right-0 left-0 my-20 text-white rounded-md bg-opacity-80">
        <h1 className=" font-bold text-3xl py-4">{isSignInform ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInform && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full rounded-md bg-transparent border border-gray-700" />}
        <input type="email" placeholder="Email Address" className="p-4 my-4 w-full rounded-md bg-transparent border border-gray-700" />
        <input type="password" placeholder="Password" className="p-4 my-4 w-full rounded-md bg-transparent border border-gray-700" />
        <button className="p-4 my-4 cursor-pointer bg-red-700 w-full rounded-md" onClick={handleButtonClick}>{isSignInform ? 'Sign In' : 'Sign Up'}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInform?'Already registered? Sign In':'New to Netflix? Sign Up Now'}</p>
      </form>
    </div>
  );
};

export default Login;
