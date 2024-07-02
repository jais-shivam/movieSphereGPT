import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();
    const appRoute = createBrowserRouter([
        {
          path:'/',
          element: <Login/>
        },
        {
          path:'/browse',
          element: <Browse/>
        }
      ]);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          console.log(user);
          
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid:uid, email:email, name:displayName, photoURL:photoURL}));
          // navigate('/browse');
        } else {
          // User is signed out
          dispatch(removeUser());
          // navigate('/');
        }
      });
      return () => {
        
      };
    }, []);
  return (
    <div>
      <RouterProvider router={appRoute} />
    </div>
  )
}

export default Body
