import { useEffect, useState } from "react"

interface WidthThereshold {
    isOverThereshold: boolean;
}

/** 
 *  ## Umbral de ancho de pantalla
 *  Este Custom Hook valida el ancho de la pantalla en base a un umbral
 *  proporcionado.
 *  
 *  ### Parámetros de entrada
 *  Este Custom Hook no recibe parámetros de entrada
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ `boolean` ] `isOverThereshold`: Indicador de si el umbral es alcanzado
 *  por el ancho de pantalla.
 */ 
const useBreakpoint: (thereshold: number) => (WidthThereshold) = ( thereshold ) => {

    // Validación de si el ancho de la pantalla es mayor al umbral
    const [ isOverThereshold, setIsOverThereshold ] = useState<boolean>(window.innerWidth > thereshold);

    // Actualización por cada vez que la pantalla se redimensiona
    useEffect(
        () => {

            // Función que indica si el umbral fue alcanzado o no
            const handleResize: () => (void) = () => {
                setIsOverThereshold(window.innerWidth > thereshold);
            }

            // Se añade el escuchador de eventos
            window.addEventListener(
                'resize',
                handleResize
            )

            // Retorno de la remoción del escuchador de eventos
            return (
                () => {
                    window.removeEventListener(
                        'resize',
                        handleResize
                    )
                }
            )
        }, [isOverThereshold, thereshold]
    )

    return { isOverThereshold };
}

export default useBreakpoint;
