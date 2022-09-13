import { Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inbox" element={<Conversation />} />
            <Route path="/inbox/:id" element={<Inbox />} />
            <Route path="*" element={<h1>404 - not found</h1>} />
        </Routes>
    );
}

export default App;
