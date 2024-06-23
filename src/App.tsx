/* eslint-disable react-refresh/only-export-components */
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Page/SignInPage";
import SignUpPage from "./Page/SignUpPage";
import Otp from "./components/Otp";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
