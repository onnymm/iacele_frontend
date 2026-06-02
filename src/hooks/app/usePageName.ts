import { useEffect, useState } from "react"
import APP_NAME from "../../constants/app/name"

const usePageName = () => {

    // Inicialización del estado
    const [ pageName, setPageName ] = useState<string | null>(null);

    // Efecto para cambio de nombre del documento
    useEffect(
        () => {
            // Si existe un nombre de página provisto...
            if ( pageName ) {
                // Cambio de nombre del documento
                document.title = `${pageName} | ${APP_NAME}`;

            // Si no existe un nombre de página de provisto...
            } else {
                // Se establece el nombre de la aplicación
                document.title = APP_NAME;
            };
        }, [pageName]
    );

    return { pageName, setPageName };
};

export default usePageName;
