import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import Match from './pages/Match';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/search",
      element: <Search />
    },
    {
      path: "/match",
      element: <Match />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
