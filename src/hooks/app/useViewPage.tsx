import { useContext, useEffect, useState } from "react";
import PageNameContext from "../../contexts/app/pageNameContext";

const useViewName = () => {

    // Obtención de la función desde el contexto
    const { setPageName } = useContext(PageNameContext);
    // Inicialización de estado
    const [ viewName, setViewName ] = useState<string | null>(null);

    // Efecto para establecer el nombre asignado a la vista
    useEffect(
        () => {
            // Se establece el nombre de la vista
            setPageName(viewName);

            // Retorno para establecer a nulo el nombre cuando el componente se desmonte
            return (
                () => setPageName(null)
            );
        }, [setPageName, viewName]
    );

    return { setViewName };
};

export default useViewName;
