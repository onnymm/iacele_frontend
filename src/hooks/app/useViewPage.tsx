import { useContext, useEffect } from "react";
import PageNameContext from "../../contexts/app/pageNameContext";

const useViewName = (name: string | null) => {

    // Obtención de la función desde el contexto
    const { setPageName } = useContext(PageNameContext);

    // Efecto para establecer el nombre asignado a la vista
    useEffect(
        () => {
            // Se establece el nombre de la vista
            setPageName(name);

            // Retorno para establecer a nulo el nombre cuando el componente se desmonte
            return (
                () => setPageName(null)
            );
        }, [setPageName, name]
    );
};

export default useViewName;
