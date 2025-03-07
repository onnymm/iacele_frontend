// import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router"
import ButtonTextIcon from "../components/ui/button/ButtonTextIcon";
import { ArrowLeftIcon, HomeIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import Alert from "../components/ui/alert/Alert";
import CompactPage from "../components/layout/CompactPage";
import Group from "../components/layout/Group";

/** 
 *  ## Página de error
 *  Este componente renderiza la página de error de la aplicación junto con un 
 *  mensaje que indica el error arrojado.
 *   
 *  `< tsx />` Se autocierra.
 *   
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const ErrorPage = (): (React.JSX.Element) => {

    // Tipado del objeto retornado por el hook useRouteError
    interface errorObject {
        data: string;
    }

    // Obtención de la función de cambio de ruta
    const navigateTo = useNavigate()

    // Obtención del error
    const error = useRouteError() as errorObject;

    return (
        <div className='z-0 relative flex flex-col bg-slate-100 dark:bg-[#101b26] h-svh transition'>
            <CompactPage>
                <Group >
                    <div className="flex flex-col items-center gap-2">
                        <NoSymbolIcon className="size-12" />
                        <p>Ha ocurrido un error</p>
                        <Alert type="error" title="Detalles">
                            {error.data}
                        </Alert>
                        <ButtonTextIcon icon={ArrowLeftIcon} onClick={() => navigateTo(-1)}>
                            Atrás
                        </ButtonTextIcon>
                        <ButtonTextIcon icon={HomeIcon} type="primary" onClick={() => navigateTo('/')}>
                            Volver al inicio
                        </ButtonTextIcon>
                    </div>
                </Group>
            </CompactPage>
        </div>
    )
}

export default ErrorPage;
