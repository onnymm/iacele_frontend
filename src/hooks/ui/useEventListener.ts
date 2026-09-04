import { useEffect, useRef } from "react";

interface ElementMap<O, E> {
    obj: O;
    event: E;
};

interface ObjEvent {
    'window': ElementMap<Window, keyof WindowEventMap>;
    'document': ElementMap<Document, keyof DocumentEventMap>;
    'htmlElement': ElementMap<React.RefObject<HTMLElement | null>, keyof HTMLElementEventMap>;
};

const useEventListener = <E extends keyof ObjEvent>(
    targetRef: ObjEvent[E]['obj'],
    event: ObjEvent[E]['event'],
    triggerCallback: EventListener,
) => {

    // Se guarda la función recibida en referencia para evitar renderizaciones innecesarias
    const triggerCallbackRef = useRef<EventListener>(triggerCallback);

    // Actualización de la función si es que ésta cambia
    useEffect(
        () => {
            triggerCallbackRef.current = triggerCallback;
        }, [triggerCallback]
    );

    // Efecto para añadir y eliminar el escuchador de eventos
    useEffect(
        () => {

            // Obtención del objeto current de la referencia
            const targetElement = (
                'current' in targetRef
                    ? targetRef.current
                    : targetRef as (
                        | Omit<ObjEvent, 'htmlElement'>['document']['obj']
                        | Omit<ObjEvent, 'htmlElement'>['window']['obj']
                    )
            );

            // Si no existe el objeto se termina la ejecución
            if ( targetElement === null ) return;

            // Obtención de la función para uso en escuchador de eventos
            const eventHandler = (event: Event) => {
                triggerCallbackRef.current(event);
            };

            // Se añade el escuchador de eventos
            targetElement.addEventListener(
                event,
                eventHandler,
            );

            // Función de remoción de escuchador de evento
            const removeEventListener = () => {
                // Si el elemento no existe...
                if ( !targetElement ) {
                    // Se termina la ejecución
                    return;
                };
                // Se remueve el escuchador de eventos
                targetElement.removeEventListener(
                    event,
                    eventHandler,
                );
            };

            return removeEventListener;
        }, [event, targetRef]
    );
};

export default useEventListener;
