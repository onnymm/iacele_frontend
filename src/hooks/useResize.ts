import { useCallback, useEffect, useRef } from "react";
import Table from "../components/table/Table"; // eslint-disable-line
import { useColumnWidths } from "./useColumnWidths"; // eslint-disable-line


/** 
 *  ## Redimensionamiento de columnas
 *  Este Custom Hook añade escuchadores de evento a los encabezados de columnas
 *  del componente {@link Table} para poder redimensionarlas en tiempo  real.
 *   
 *  ### Parámetros de entrada
 *  - [ {@link React.RefObject<HTMLDivElement>} ] `resizableRef`: Referencia de 
 *  contenedor redimensionable.
 *  - [ {@link React.RefObject<HTMLDivElement>} ] `resizerRef`: Referencia de 
 *  contenedor redimensionador.
 *  - [ `string` ] `columnKey`: Llave de la columna que se redimensionará, esto 
 *  para el Custom Hook {@link useColumnWidths}.
 *  - [ `undefined` ] `resizeColumn`: Función de redimensionamiento de columna, 
 *  obtenida desde el Custom Hook {@link useColumnWidths}.
 */ 
const useResize = (
    resizableRef: React.RefObject<HTMLDivElement>, // Referencia de contenedor redimensionable.
    resizerRef: React.RefObject<HTMLDivElement>, // Referencia de contenedor redimensionador.
    columnKey: string, // Llave de la columna que se redimensionará, esto para el Custom Hook {@link useColumnWidths}.
    resizeColumn: (columnKey: string, width: number | null) => void, // Función de redimensionamiento de columna, obtenida desde el Custom Hook {@link useColumnWidths}.
): (React.RefObject<number>) => {

    // Valor referenciado de longitud inicial
    const initialWidth = useRef<number>(0);
    // Valor referenciado de inicio de posición en el eje X
    const startX = useRef<number>(0);

    // Función de redimensionamiento en progreso
    const doResize = useCallback(
        (event: MouseEvent): void => {

            if ( resizableRef.current ) {
                // Se actualiza la longitud del contenedor redimensionable
                resizableRef.current.style.width = `${initialWidth.current + event.clientX - startX.current}px`;
                resizeColumn(columnKey, initialWidth.current + event.clientX - startX.current)
            }
        }, [resizableRef, initialWidth, startX, columnKey, resizeColumn]
    )

    // Función de redimensionamiento terminado
    const stopResize = useCallback(
        (): void => {

            if ( resizableRef.current ) {
                // Se actualiza la longitud inicial
                initialWidth.current = Number(resizableRef.current.style.width);
            }

            // Se remueve el escuchador de evento de mouse en movimiento
            document.removeEventListener(
                'mousemove',
                doResize
            );

            // Se reinicia el estilo del cursor a su estado normal
            document.body.style.cursor = "";
        }, [resizableRef, doResize]
    );

    // Función de inicio de redimensionamiento
    const startResize = useCallback(
        (event: MouseEvent): void => {

            // Se actualiza el inicio de posición en el eje X con respecto a la
            //      posición del mouse
            startX.current = event.clientX;

            if ( resizableRef.current ) {
                // Se actualiza la longitud inicial
                initialWidth.current = Number(resizableRef.current.offsetWidth);
            }

            // Se añade el escuchador de evento de mouse en movimiento
            document.addEventListener(
                'mousemove',
                doResize
            );

            // Se añade el escuchador de evento cuando mouse deja de presionarse
            document.addEventListener(
                'mouseup',
                stopResize
            );

            // Se cambia el estilo del cursor para que aplique en toda la
            //      pantalla. Este comportamiento es más natural.
            document.body.style.cursor = "col-resize";
        }, [resizableRef, doResize, stopResize]
    );

    // Inicio del efecto
    useEffect(
        () => {
            // Se guarda la instancia para poder remover el efecto a ésta
            const instance = resizerRef.current;

            // Se añade el escuchador de evento de clic
            instance?.addEventListener(
                'mousedown',
                startResize
            );

            // Se retorna la remoción del escuchador de evento de clic a la
            //      instancia al limpiador de desmontaje
            return (
                () => {
                    instance?.removeEventListener(
                        'mousedown',
                        startResize
                    )
                }
            );
        }, [resizerRef, startResize]
    );

    // Retorno de estado de ancho de columna
    return initialWidth;
}

export default useResize;
