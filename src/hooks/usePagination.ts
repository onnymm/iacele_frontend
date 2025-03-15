import { SetStateAction, useCallback } from "react"

/** 
 *  ## Funciones controladas de cambio de página
 *  Este Custom Hook crea funciones controladas de decremento, incremento y
 *  cambio manual de página controlando que los cambios no se hagan fuera del
 *  dominio de paginación.
 *  
 *  ### Parámetros de entrada
 *  - [ `number[]` ] `pages`: Arreglo de páginas de 0 a n.
 *  - [ `setPage` ] `setPage`: Función de cambio de estado de página actual.
 *  
 *  ### Retorno:
 *  Este Custom Hook retorna:
 *  - [ {@link React.Dispatch<SetStateAction>} ] `setPageIndex`: Función de
 *  cambio de estado para establecer manualmente una página.
 *  - [ {@link React.Dispatch<SetStateAction>} ] `increasePage`: Función de
 *  cambio de estado para incrementar página.
 *  - [ {@link React.Dispatch<SetStateAction>} ] `decreasePage`: Función de
 *  cambio de estado para decrementar página.
 */ 
const usePagination = (
    pages: number[],
    setPage: React.Dispatch<SetStateAction<number | undefined | ((page: number) => (number))>>,
) => {

    // Función para selección de página
    const setPageIndex = useCallback(
        (page: number | string) => {
            if ( typeof page == "string" ) return;
            setPage(page);
        }, [setPage]
    );

    // Función de incremento de página
    const increasePage = useCallback(
        () => {
            setPage( (page: number) => (page + 1 === pages.length ? page : page + 1) );
        }, [setPage, pages.length]
    );

    // Función de decremento de página
    const decreasePage = useCallback(
        () => {
            setPage( (page: number) => (page === 0 ? page : page - 1) );
        }, [setPage]
    )

    return {
        setPageIndex,
        increasePage,
        decreasePage,
    };
};

export default usePagination;
