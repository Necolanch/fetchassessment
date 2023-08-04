import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { AuthService } from './services/auth/authService';
import { APIGateway } from './services/APIGateway';
import { Provider } from 'react-redux';
import { store } from './store';

const apiGateway = new APIGateway();
const authGateway = new AuthService(apiGateway);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login authGateway={authGateway} />
  },
  {
    path: "/search",
    element: <Search />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();