import { Route, Routes } from "react-router"
import App from "./App"
import Login from "./routes/Login";
import DataView from "./routes/DataView";

const Router = () => {

    return (
        <Routes>
            <Route element={<App />}>
                <Route path="/view" element={<DataView />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
