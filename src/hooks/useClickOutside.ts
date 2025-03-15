import { useCallback, useEffect } from "react"

/** 
 *  ## Clic afuera
 *  Este Custom Hook crea un escuchador de eventos en el documento HTML para
 *  detectar un clic fuera del componente del objeto `ref` proporcionado al
 *  hook y ejecuta la función también provista a éste
 *  
 *  ### Parámetros de entrada
 *  [ {@link React.MutableRefObject} ] `ref`: Referencia al componente del que
 *  se debe detectar un clic dentro o fuera.
 *  [ `function` ] `callback`: Función a ejecutar si se hace un clic afuera.
 *  
 *  ### Retorno
 *  Este Custom Hook no retorna ningún elemento.
 */ 
const useClickOutside: (ref: React.MutableRefObject<HTMLElement | null>, callback: () => (void)) => (void) = (
    ref,
    callback,
) => {

    // Función a ejecutar si el clic fue fuera de la referencia
    const handleClick = useCallback(
        ( event: MouseEvent ) => {
            // Validación del clic
            if ( ref && ref.current && !ref.current.contains(event.target as Node) ) {
                // Ejecución de la función provista
                callback();
            }
        },  [callback, ref]
    );

    useEffect(
        () => {
            // Se añade el escuchador de eventos de clic
            document.addEventListener(
                'mousedown',
                handleClick,
            );

            // Se retorna la remoción del evento
            return (
                () => {
                    // Se añade el escuchador de eventos de clic
                    document.removeEventListener(
                        'mousedown',
                        handleClick,
                    )
                }
            );
        }, [handleClick]
    );
};

export default useClickOutside;
