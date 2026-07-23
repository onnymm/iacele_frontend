import { Outlet } from "react-router";
import Navbar from "./components/common/navbar/Navbar";
import useRedirectToLogin from "./hooks/app/useRedirectToLogin";
import HeaderControlsBearer from "./components/common/main/AppHeader";
import useWebsocketNotification from "./hooks/app/useWebsocketNotification";
import showToast from "./components/ui/toast/toast";
import { KeyRound } from "lucide-react";

const App = () => {

    useRedirectToLogin();

    useDefaultToastNotifications();

    return (
        <>
            <Navbar />
            <HeaderControlsBearer />
            <Outlet />
        </>
    );
};

export default App;

const useDefaultToastNotifications = () => {

    useWebsocketNotification(
        'password.changed',
        () => {
            showToast({
                title: 'Cambio de contraseña',
                content: 'La contraseña ha sido cambiada.',
                icon: KeyRound,
                type: 'warning',
            })
        },
    );
};
