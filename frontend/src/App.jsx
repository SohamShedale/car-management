import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Cars from './components/Cars'
import CarRegister from './components/CarRegister'
import CarDetails from './components/CarDetails'
import CarUpdate from './components/CarUpdate'
import ProtectedRoute from './components/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cars",
    element: (
      <ProtectedRoute>
        <Cars />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cars/register",
    element: (
      <ProtectedRoute>
        <CarRegister />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cars/detail/:id",
    element: (
      <ProtectedRoute>
        <CarDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cars/update/:id",
    element: (
      <ProtectedRoute>
        <CarUpdate />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
