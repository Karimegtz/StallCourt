import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Aquí usamos el componente principal `App`
    errorElement: <ErrorPage />, // Manejamos errores con `ErrorPage`
    children: [
      {
        index: true,
        element: <Home />, // Página de inicio
      },
      {
        path: '/login',
        element: <Login />, // Página de inicio de sesión
      },
      {
        path: '/signup',
        element: <Signup />, // Página de registro
      },
      {
        path: '/profiles/:username',
        element: <Profile />, // Página de perfil de usuario
      },
      {
        path: '/me',
        element: <Profile />, // Página de perfil personal
      },
      {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />, // Página de pensamiento único
      },
    ],
  },
]);

// Render the application with the RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Proveedor de rutas de React Router
);
