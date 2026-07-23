import { Outlet } from "react-router";
import Navbar from "./components/common/navbar/Navbar";
import useRedirectToLogin from "./hooks/app/useRedirectToLogin";
import HeaderControlsBearer from "./components/common/main/AppHeader";

const App = () => {

    useRedirectToLogin();

    return (
        <>
            <Navbar />
            <HeaderControlsBearer />
            <Outlet />
        </>
    );
};

export default App;
