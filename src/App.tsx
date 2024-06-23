/* eslint-disable react-refresh/only-export-components */
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Page/SignInPage";
import SignUpPage from "./Page/SignUpPage";
import Otp from "./components/Otp";
import Profile from "./components/Profile";

// Function to get email from localStorage
export const getEmail = (): string | null => {
  const formDataString = localStorage.getItem("formData");
  if (formDataString) {
    const parsedFormData = JSON.parse(formDataString);
    return parsedFormData.email;
  } else {
    console.log("No formData found in localStorage");
    return null;
  }
};

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
    element: <Otp email={getEmail() || "default@example.com"} />,
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
