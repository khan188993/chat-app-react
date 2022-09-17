import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>checking auth...</div>
    ) : (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />
            <Route
                path="/inbox"
                element={
                    <PrivateRoute>
                        <Conversation />
                    </PrivateRoute>
                }
            />
            <Route
                path="/inbox/:id"
                element={
                    <PrivateRoute>
                        <Inbox />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<h1>404 - not found</h1>} />
        </Routes>
    );
}

export default App;
