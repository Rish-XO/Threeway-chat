import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
