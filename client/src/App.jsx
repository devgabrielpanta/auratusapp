import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Protected from "./auth/Protected";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookingsSystem from "./pages/BookingsSystem";


export default function App() {

  const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/app",
        element: (
          <Protected>
            <BookingsSystem />
          </Protected>
        ),
    },
    {
        path: "/login",
        element: (
          <Login />
        ),
    },
]);
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
