import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Page/SignInPage";
import HomePage from "./Page/HomePage";
import SignUpPage from "./Page/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/login",
    element: <SignInPage></SignInPage>,
  },
  {
    path: "/home",
    element: <HomePage></HomePage>,
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
