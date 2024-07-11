import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './Login';
import Browse from './Browse';

const Body = () => {
  const appRoute = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    }
  ]);
  return (
    <div className="no-scrollbar">
      <RouterProvider router={appRoute} />
    </div>
  )
}

export default Body
