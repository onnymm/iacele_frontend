import { Route, Routes } from "react-router"
import App from "./App"
import Login from "./routes/Login";
import Home from "./routes/Home";
import Me from "./routes/Me";
import URLDataViewProvider from "./providers/views/URLDataViewProvider";

const Router = () => {

    return (
        <Routes>
            <Route element={<App />}>
                <Route index element={<Home />} />
                <Route path="/me" element={<Me />} />
                <Route path="/view" element={<URLDataViewProvider />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
