import { Route, Routes } from "react-router"
import App from "./App"

const Router = () => {

    return (
        <Routes>
            <Route index element={<App />} />
        </Routes>
    );
};

export default Router;
