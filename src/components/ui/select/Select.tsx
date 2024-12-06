import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/solid";
import ButtonTextIcon from "../button/ButtonTextIcon";
import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import Listbox from "../listbox/Listbox";

interface SelectParams {
    children: string;
    options: OptionObject[];
    setOptions: (key: string | number | boolean) => (void);
    icon: IconType;
    type?: UIStyle;
    mode: SelectableOptionsBehavior;
}

/** 
 *  ## Selección de opciones
 *  Este componente renderiza un botón desplegable que muestra opciones a
 *  seleccionar, obtenidas desde el Custom Hook {@link useOptions}.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link OptionObject OptionObject[ ]} ] `options`: Arreglo de elementos
 *  de opciones.
 *  obtenidos del Custom Hook {@link useOptions} para renderizar en la caja de
 *  lista de opciones.
 *  - [ `undefined` ] `setOptions`: Función de cambio de estado de opciones
 *  activas obtenida del Custom Hook {@link useOptions}.
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo a renderizar en las
 *  opciones cuando están activas.
 *  - [ {@link UIStyle} ] `type`: Estilo de botón a renderizar. Las opciones
 *  disponibles son:
 *      - `primary`
 *      - `secondary`
 *      - `danger`
 *      - `success`
 *  - [ {@link SelectableOptionsBehavior} ] `mode`: Modo de
 *  selección de opciones. Las opciones disponibles son:
 *      - `'switch'`: Sólo una opción a la vez, puede ser activada y
 *  desactivada. La lista de opciones se contrae al seleccionar una opción.
 *      - `'alwaysActive'`: Sólo una opción a la vez, siempre permanecerá una
 *  opción activa.  La lista de opciones se contrae al seleccionar una opción.
 *      - `'multiOption'`: Varias opciones a la vez, pueden ser activadas o
 *  desactivadas. La lista de opciones no se contrae al seleccionar una opción.
 */
const Select: (config: SelectParams) => (React.JSX.Element) = ({
    children,
    options,
    setOptions,
    icon,
    type = 'secondary',
    mode,
}) => {

    // Inicialización de estado de lista de opciones
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    // Inicialización de referencia de lista de opciones para uso de clic afuera
    const selectRef = useRef(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const listboxRef = useRef<HTMLDivElement>(null)

    // Uso de funcionalidad de clic afuera para la lista de opciones
    useClickOutside(selectRef, () => setIsOpen(false));

    // Si el modo es de una opción a la vez, la lista de opciones se cierra tras un cambio
    useEffect(
        () => {
            if ( mode === "switch" || mode === "alwaysActive" ) {
                setIsOpen(false)
            }
        }, [options, mode]
    )

    // Se resetea el deslizamiento vertical en el momento en el que la lista
    //      opciones se despliega.
    useEffect(
        () => {
            if ( isOpen ) {
                listboxRef.current?.scroll(0, 0)
            }
        }, [isOpen]
    )

    return (
        <div className="flex flex-col w-min pointer-events-none *:pointer-events-auto" ref={selectRef}>
            <ButtonTextIcon onClick={() => setIsOpen(prevState => !prevState)} icon={FunnelIcon} type={type}>
                <div className="flex flex-row items-center gap-4">
                    {children}
                    <div className="flex justify-center items-center size-4">
                        <ChevronDownIcon className={`${isOpen ? "rotate-180" : "" } transition text-current size-full`}/>
                    </div>
                </div>
            </ButtonTextIcon>
            <div className="relative z-10">
                <div ref={wrapperRef} className={`${isOpen ? "scale-y-100": "-translate-y-[50%]"} w-min transition duration-300 scale-y-0 absolute`}>
                    <Listbox items={options} setActive={setOptions} iconActive={icon} _listboxRef={listboxRef} />
                </div>
            </div>
        </div>
    )
}

export default Select;