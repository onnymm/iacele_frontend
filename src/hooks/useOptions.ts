import { useState } from "react";

interface OptionObject<T extends string | number | boolean>{
    key: T;
    active: boolean;
    displayName: string;
    [ keysToKeep: string | number ]: number | string | boolean | object;
}

type KeyType<T extends SelectableOption<string | number | boolean>[]> = T[0]['key']

interface UseOptionsConfig<T>{
    keysToKeep?:  Array<string | number> | undefined; // Atributos de los objetos que se desean conservar, para uso personalizado.
    initialActive?: string | number | boolean | undefined; // Llave de alguno de los atributos que se inicializará como opción opción activas.
    mode?: SelectableOptionsBehavior; // Modo de selección de opciones. Las opciones disponibles son:
    validateActive?: (item: T) => (boolean); // Función para validar si alguna de las opciones iniciará como activa.
}

const defaultConfig = {
    keysToKeep: undefined,
    initialActive: undefined,
    mode: "switch",
    validateActive: () => false,
}

/** 
 *  ## Opciones seleccionables
 *  Este Custom Hook crea un objeto interactivo de opciones para ser
 *  renderizado por los componentes {@link Select} o {@link Listbox}.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link SelectableOption SelectableOption<string | number | boolean>[ ]} ]
 *  `items`: Arreglo de elementos a usar como opciones. Éstos deben contener al
 *  menos las dos siguientes llaves en cada de uno de ellos:
 *      - [ `(string | number | boolean)` ] `key`: Llave que se usará para
 *  activar o desactivar la opción.
 *      - [ `string` ] `displayName`: Nombre a renderizar por el componente
 *  {@link Listbox} por sí sólo o a través del componente {@link Select}.
 *  - [ {@link UseOptionsConfig UseOptionsConfig<string | number | boolean> } ]
 *  `{}` Opciones de generación de objeto interactivo de opciones:
 *      - [ `(string | number | undefined)[]` ] `keysToKeep`: Atributos
 *  de los objetos que se desean conservar, para uso personalizado.
 *      - [ `(string | number | boolean | undefined)` ] `initialActive`: Llave
 *  de alguno de los atributos que se inicializará como opción opción activas.
 *  Esta característica no está disponible para comportamiento multiopción.
 *      - [ {@link SelectableOptionsBehavior} ] `mode`: Modo de selección de
 *  opciones. Las opciones disponibles son:
 *          - `'switch'`: Sólo una opción a la vez, puede ser activada y desactivada. La lista de opciones se contrae al seleccionar una opción.
 *          - `'alwaysActive'`: Sólo una opción a la vez, siempre permanecerá una opción activa. La lista de opciones se contrae al seleccionar una opción.
 *          - `'multiOption'`: Varias opciones a la vez, pueden ser activadas o desactivadas. La lista de opciones no se contrae al seleccionar una opción.
 *      - [ `undefined` ] `validateActive`: Función para validar si alguna de
 *  las opciones iniciará como activa.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  ```
 *  // Parámetros renombrables
 *  [options, activeOptionKey, setActiveOption]
 *  ```
 *  - [ {@link OptionObject OptionObject[ ]} ] Objeto de opciones interactivo.
 *  - [ `string | number` ] `setActiveOption`: Función para establecer las
 *  opciones activas.
 *  - [ `string | number | boolean | undefined` ] Valor de llave activa. Si el
 *  modo de selección de opciones es `'multiOption'` este valor será
 *  `undefined`.
 */ 
const useOptions = <T extends SelectableOption<string | number | boolean>[]>(
    items: T,
    config: UseOptionsConfig<T[0]> = {} 
): [
    OptionObject<KeyType<T>>[],
    (key: KeyType<T>) => (void),
    KeyType<T> | undefined
] => {

    // Uso de las opciones especificadas y las opciones por defecto.
    const finalConfig = {
        ...defaultConfig,
        ...config
    }

    // Inicialización de opciones
    const initialOptions = items.map(
        (item) => {

            // Mapeo de los atributos de funcionamiento para el componente select
            const option: OptionObject<T[0]['key']> = {
                key: item.key,
                active: (
                    finalConfig.mode === "switch" || finalConfig.mode === "alwaysActive"
                        ? finalConfig.validateActive(item) || finalConfig.initialActive === item.key
                        : finalConfig.validateActive(item)
                ),
                displayName: item.displayName,
            };

            // Mapeo de los atributos para uso personalizado
            if ( finalConfig.keysToKeep ) {
                finalConfig.keysToKeep.map(
                    (key) => {
                        option[key] = item[key];
                    }
                );
            }

            // Retorno del objeto
            return option;
        }
    );

    // Mapa de opciones
    const [ options, setOptions ] = useState<OptionObject<KeyType<T>>[]>(initialOptions);
    // Estado de llave de opción activa
    const [ activeOptionKey, setActiveOptionKey ] = useState<KeyType<T> | undefined>(finalConfig.initialActive);

    // Función para establecer opción activa
    const setActiveOption = (key: string | number | boolean): (void) => {

        // Se crea una copia del mapa de opciones
        const optionsCopy = [ ...options ];

        // Se busca el item con el nombre que contenga la llave
        const foundItem = optionsCopy.find(
            (item) => (item.key === key)
        );

        // Si el modo consiste en sólo una opción activa
        if ( finalConfig.mode === "switch" || finalConfig.mode === "alwaysActive" ) {
            // Se establecen todas las opciones a inactivas
            optionsCopy.forEach(
                (option) => {
                    if ( foundItem && foundItem.key !== option.key ) {
                        option.active = false;
                    }
                }
            );
        }

        // Se establece el estado del item encontrado a activo
        if ( finalConfig.mode === "alwaysActive" && foundItem ) {
            // En caso de haber un siempre disponible, siempre debe haber un item en `true`
            foundItem.active = true;
        } else if ( (finalConfig.mode === "switch" || finalConfig.mode === "multiOption") && foundItem ) {
            // En caso de no haber un siempre disponible, se establece al estado opuesto
            foundItem.active = !foundItem.active;
        }

        // Se asignan las opciones de la copia del mapa
        setOptions(optionsCopy);
        // Se asigna la nueva llave de opción activa
        setActiveOptionKey(key);
    }

    // Retorno del objeto para el componente, el estado de opción activa y la función de cambio de estado de opción activa
    return [options, setActiveOption, activeOptionKey];
}

export default useOptions;
