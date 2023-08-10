import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import MInputForm from "./components/ManufacturerInput";
import ChatPage from "./components/chat/ChatPage";
import SearchPage from "./components/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "newMessage", element: <MInputForm /> },
      { path: "chat/:orderID", element: <ChatPage /> },
      {path: "search", element: <SearchPage />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
