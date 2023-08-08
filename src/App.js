import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from './components/Root'
import Home from "./components/Home";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
