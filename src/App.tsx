import { Outlet } from "react-router";
import Navbar from "./components/common/navbar/Navbar";
import useRedirectToLogin from "./hooks/app/useRedirectToLogin";
// import useView from "./views/useView";

const App = () => {

    useRedirectToLogin();

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default App;
