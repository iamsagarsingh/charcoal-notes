import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import GuestRoutes from "./routes/GuestRoutes.jsx";
import NoteEditor from "./pages/NoteEditor.jsx";
import { NoteContextProvider } from "./context/NotesContext.jsx";
import { NoteViewer } from "./pages/NoteViewer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <GuestRoutes>
            <Login />
          </GuestRoutes>
        ),
      },
      {
        path: "/signup",
        element: (
          <GuestRoutes>
            <Signup />
          </GuestRoutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-note/:id?",
        element: (
          <ProtectedRoute>
            <NoteEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: "/note/:id",
        element: (
          <ProtectedRoute>
            <NoteViewer />
          </ProtectedRoute>
        ),
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <NoteContextProvider>
        <RouterProvider router={router} />
      </NoteContextProvider>
    </UserContextProvider>
  </StrictMode>
);
