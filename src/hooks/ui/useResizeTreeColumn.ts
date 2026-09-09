import { useCallback, useEffect, useRef, useState } from "react";

const useResizeTreeColumn = () => {

    // Inicialización de referencia del elemento redimensionable
    const resizeableRef = useRef<HTMLTableCellElement>(null);
    // Inicialización de referencia del elemento redimensionador
    const resizerRef = useRef<HTMLDivElement>(null);
    // Inicialización de referencia de ancho inicial
    const initialWidthRef = useRef<HTMLDivElement>(null);
    // Inicialización de estado de ancho
    const [ width, setWidth ] = useState<number | null>(null);

    // Función para llevar a cabo el redimensionamiento en base a la posición horizontal del mouse
    const doResize = useCallback(
        (event: MouseEvent) => {
            // Manejo de tipado
            if ( resizerRef.current === null ) return;
            if ( resizeableRef.current === null ) return;

            // Obtención de la posición y tamaño del elemento
            const boundingClient = resizerRef.current.getBoundingClientRect();

            // Cómputo de nuevo ancho
            const newWidth = resizeableRef.current.offsetWidth + event.clientX - boundingClient.x

            // Se establece la nueva longitud del elemento
            setWidth(
                (prev) => (
                    prev === null
                        ? prev
                        : Math.max(newWidth, 60)
                )
            );
            // Detención del efecto bubbling
            event.stopPropagation();
        }, []
    );

    // Función para detener el redimensionamiento
    const stopResize = useCallback(
        () => {

            // Se remueve el escuchador de eventos
            document.removeEventListener('mousemove', doResize);
            // Se reestablece el estilo del cursor
            document.body.style.cursor = '';
        }, [doResize]
    );

    // Función para iniciar el redimensionamiento
    const startResize = useCallback(
        () => {

            // Se añade el escuchador de eventos para realizar el redimensionamiento en base a la posición del mouse
            document.addEventListener('mousemove', doResize);
            // Se añade el escuchador de eventos para detener el redimensionamiento cuando se levanta el botón del mouse
            document.addEventListener('mouseup', stopResize);

            // Se establece el estilo del cursor para mantener consistencia cuando el cursor se aleja del elemento
            document.body.style.cursor = 'col-resize';
        }, [doResize, stopResize]
    );

    useEffect(
        () => {
            // Si las referencias no son nulas...
            if ( initialWidthRef.current !== null && resizeableRef.current !== null) {
                // Se establece un ancho fijo para iniciar el redimensionamiento
                setWidth(resizeableRef.current.offsetWidth + 2);
            };
        }, []
    );

    useEffect(
        () => {

            // Obtención del elemento redimensionador
            const element = resizerRef.current;

            // Si el elemento es nulo...
            if ( element === null ) {
                // Se termina la ejecución
                return;
            };

            // Se añade el escuchador de eventos para iniciar el redimensionamiento cuando se da clic con el mouse
            element.addEventListener('mousedown', startResize);

            // Función para remover el escuchador de eventos cuando el componente se desmonta
            const removeEventListener = () => {
                element.removeEventListener('mousedown', startResize);
            };

            return (removeEventListener);
        }, [startResize]
    );

    // Efecto para actualizar el ancho del elemento en base al ancho computado
    useEffect(
        () => {
            // Si alguno de los valores es nulo se termina la ejecución
            if ( resizeableRef.current === null || width === null) return;
            // Reasignación de valor de ancho
            resizeableRef.current.style.width = `${width}px`;
        }, [width]
    );

    return { resizerRef, resizeableRef, initialWidthRef };
};

export default useResizeTreeColumn;
