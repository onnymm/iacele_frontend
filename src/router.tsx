import { Route, Routes } from "react-router"
import App from "./App"
import Login from "./routes/Login";
import DataView from "./routes/DataView";
import Home from "./routes/Home";

const Router = () => {

    return (
        <Routes>
            <Route element={<App />}>
                <Route index element={<Home />} />
                <Route path="/view" element={<DataView />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
