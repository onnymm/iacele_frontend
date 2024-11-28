import { useContext } from 'react';
import { DarkModeContext } from './contexts/darkModeContext';
import useDarkMode from './hooks/useDarkMode';
import Login from './routes/Login';
import { TokenContext } from './contexts/tokenContext';
import Home from './routes/layout/Home';

const App: () => (React.JSX.Element) = () => {

    // Obtención del hook de modo oscuro para contexto
    const { darkMode, setDarkMode } = useDarkMode();

    // Obtención del token de autenticación por medio del valor del contexto
    const { token } = useContext(TokenContext);

    return (
        // Proveedor de contexto de modo oscuro
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <div className='relative z-0 flex flex-col bg-slate-100 dark:bg-[#101b26] h-svh transition'>
                {
                    !token
                    ? (
                        <Login />
                    )
                    :
                    <Home />
                }
            </div>
        </DarkModeContext.Provider>
    )
};

export default App;
