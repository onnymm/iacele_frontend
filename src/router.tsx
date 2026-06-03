import { Route, Routes } from "react-router"
import App from "./App"
import Login from "./routes/Login";

const Router = () => {

    return (
        <Routes>
            <Route index element={<App />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
