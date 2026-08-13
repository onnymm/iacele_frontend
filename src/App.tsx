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
        <main className="flex flex-col h-svh">
            <Navbar />
            <HeaderControlsBearer />
            <section className="h-full overflow-scroll">
                <Outlet />
            </section>
        </main>
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
