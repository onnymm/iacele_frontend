import { useState } from "react";
// import DataView from "../components/data_visualizers/DataView"; // eslint-disable-line
import Select from "../components/ui/select/Select"; // eslint-disable-line

/** 
 *  ## Custom Hook de campos de ordenamiento
 *  Este Custom Hook recibe el objeto de configuración de vista y crea los
 *  estados y funciones de cambio de estado necesarios para utilizarse en la
 *  vista de tabla y vista de kanban del componente {@link DataView}.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link ViewConfig} ] `viewConfig`: Configuración de vista del
 *  componente {@link DataView}.
 *  
 *  ### Retorno:
 *  Este Custom Hook retorna:
 *  ```
 *  {
 *     // Estados
 *      sortingFields,
 *      sortingDirections,
 *      sortingFieldKey,
 *      ascending,
 *      // Funciones de cambio de estado
 *      setTableSortingField,
 *      setKanbanSortingField,
 *      setKanbanAscending,
 *  }
 *  ```
 *  - [ {@link OptionObject OptionObject[ ]} ] `sortingFields`: Este estado se
 *  utiliza en el componente {@link Select} para renderizar los campos de
 *  ordenamiento y el campo actualmente activo.
 *  - [ {@link OptionObject OptionObject[ ]} ] `sortingDirections`: Este estado
 *  se utiliza en el componente {@link Select} para renderizar las direcciones
 *  de ordenamiento y la dirección actualmente activa.
 *  - [ `string | undefined` ] `sortingFieldKey`: Este estado se utiliza en la
 *  renderización de las columnas de la vista de tabla para indicar el campo de
 *  ordenamiento actualmente activo.
 *  - [ `boolean` ] `ascending`: Este estado se utiliza en la renderización de
 *  las columnas de la vista de tabla para indicar la dirección de ordenamiento
 *  actualmente activa.
 *  - [ `function` ] `setTableSortingField`: Esta función de cambio de estado
 *  se utiliza en el componente {@link Select} visible junto con la vista de
 *  tabla, para seleccionar el campo de ordenamiento.
 *  - [ `function` ] `setKanbanSortingField`: Esta función de cambio de estado
 *  se utiliza en el componente {@link Select} visible junto con la vista de
 *  kanban, para seleccionar el campo de ordenamiento.
 *  - [ `function` ] `setKanbanAscending`: Esta función de cambio de estado se
 *  utiliza en el componente {@link Select} visible junto con la vista de
 *  kanban, para seleccionar la dirección de ordenamiento.
 */ 
const useSortingFields = (viewConfig: ViewConfig[]): {
    sortingFields: OptionObject[]; 
    sortingDirections: OptionObject[];
    sortingFieldKey: string | undefined;
    ascending: boolean;
    setTableSortingField: (key: string) => void;
    setKanbanSortingField: (key: string) => void;
    setKanbanAscending: (key: boolean) => void;
} => {

    // Inicialización de  objeto de estado de ordenamiento de campos
    const initFields: OptionObject[] = (
        viewConfig.filter(
            (item) => (item.canSort !== false)
        )
        .map(
            (item) => {

                // Inicialización del objeto del campo
                const field = {
                    key: item.key,
                    displayName: item.displayName,
                    active: false,
                };

                // Retorno del campo
                return field;
            }
        )
    );

    // Inicalización de objeto de direcciones de ordenamiento
    const initSortingDirections: OptionObject[] = [
        {
            key: true,
            displayName: 'Ascendente',
            active: true,
        },
        {
            key: false,
            displayName: 'Descendente',
            active: false,
        }
    ];

    // Inicialización de estado de campos de ordenamiento
    const [ sortingFields, setSortingFields ] = useState<OptionObject[]>(initFields);

    // Inicialización de estado de direcciones de ordenamiento
    const [ sortingDirections, setSortingDirections ] = useState<OptionObject[]>(initSortingDirections);

    // Inicialización de llave de ordenamiento como indefinida
    const [ sortingFieldKey, setSortingFieldKey ] = useState<string | undefined>(undefined);

    // Inicialización de llave de dirección de ordenamiento
    const [ ascending, setAscending ] = useState<boolean>(true);

    const setTableSortingField = (key: string): void => {

        // Se crea una copia del estado de campos de ordenamiento
        const sortingFieldsCopy = [ ...sortingFields ];

        // Se establecen todos los campos de ordenamiento a inactivos
        sortingFieldsCopy.forEach(
            (field) => {
                field.active = false;
            }
        );

        // Se crea una copia del estado de direcciones de ordenamiento
        const sortingDirectionsCopy = [ ...sortingDirections ];

        // Búsqueda del campo de ordenamiento seleccionado por la llave entrante
        const foundField = sortingFieldsCopy.find(
            (field) => (field.key === key)
        );

        // Si la llave seleccionada es distinta a la actual
        if ( sortingFieldKey !== key ) {
            // Se establece la copia de las direcciones de ordenamiento a falso
            sortingDirectionsCopy.forEach(
                (item) => {
                    item.active = false;
                }
            );

            // Búsqueda de la dirección de ordenamiento ascendente
            const foundSortingDirection = sortingDirectionsCopy.find(
                (item) => (item.key === true)
            );

            if ( foundField && foundSortingDirection ) {
                // Se establece el nuevo campo de ordenamiento a activo
                foundField.active = true;
                // Se establece la dirección de ordenamiento ascendente a activa
                foundSortingDirection.active = true;
            }

            // Cambio de estado de objeto de campos de ordenamiento
            setSortingFields(sortingFieldsCopy);
            // Cambio de estado de objectos de direcciones de ordenamiento
            setSortingDirections(sortingDirectionsCopy);
            // Cambio de estado de campo de ordenamiento
            setSortingFieldKey(key);
            // Cambio de estado de dirección de ordenamiento
            setAscending(true);
        
        // En caso de ser la llave seleccionada igual a la actual
        } else {

            // Se establece la copia de las direcciones de ordenamiento a inactivas
            sortingDirectionsCopy.forEach(
                (item) => {
                    item.active = false;
                }
            )

            // Búsqueda de la dirección de ordenamiento contraria a la actual
            const foundSortingDirection = sortingDirectionsCopy.find(
                (item) => (item.key === !ascending)
            )

            // Se establece la nueva dirección de ordenamiento a activa
            if ( foundSortingDirection ) {
                foundSortingDirection.active = true;
            }

            // Cambio de estado del objeto de direcciones de ordenamiento
            setSortingDirections(sortingDirectionsCopy);
            // Cambio de estado booleano de la dirección de ordenamiento
            setAscending( (prevState) => (!prevState) );
        }
    }

    const setKanbanSortingField = (key: string): void => {

        // Se crea una copia de los campos de ordenamiento
        const sortingFieldsCopy = [ ...sortingFields ];

        // Búsqueda del campo de ordenamiento seleccionad por la llave entrante
        const foundField = sortingFieldsCopy.find(
            (field) => (field.key === key)
        );
        // Se establecen todos los campos de ordenamiento a inactivos
        sortingFieldsCopy.forEach(
            (field) => {
                field.active = false;
            }
        );

        // Si el estado de dirección de ordenamiento está indefinido
        if ( ascending === undefined ) {

            // Se crea una copua del estado de direcciones de ordenamiento
            const sortingDirectionsCopy = [ ...sortingDirections ];

            const foundSortingDirection = sortingDirectionsCopy.find(
                (item) => (item.key === true)
            );

            if ( foundSortingDirection ) {
                // Búsqueda de la dirección de ordenamiento ascendente
                foundSortingDirection.active = true;
            }

            // Cambio de estado de objeto de direcciones de ordenamiento
            setSortingDirections(sortingDirectionsCopy);
            // Cambio de estado de dirección de ordenamiento
            setAscending(true);
        }

        if ( foundField ) {
            // Se establece el nuevo campo de ordenamiento a activo
            foundField.active = true;
        }

        // Cambio de estado de objecto de campos de ordenamiento
        setSortingFields(sortingFieldsCopy);
        // Cambio de estado de campo de ordenamiento
        setSortingFieldKey(key);
    };

    const setKanbanAscending = (key: boolean): void => {

        // Se crea una copia del estado de direcciones de ordenamiento
        const sortingDirectionsCopy = [ ...sortingDirections ];

        // Búsqueda de la dirección de ordenamiento ascendente
        const foundSortingDirection = sortingDirectionsCopy.find(
            (item) => (item.key === key)
        );

        // Se establece la copia de las direcciones de ordenamiento a falso
        sortingDirectionsCopy.forEach(
            (item) => (item.key === key)
        );

        // Se establece la dirección de ordenamiento ascendente a activa
        if ( foundSortingDirection ) {
            foundSortingDirection.active = true;
        }

        // Cambio de estado de objeto de direcciones de ordenamiento
        setSortingDirections(sortingDirectionsCopy);
        // Cambio de estado de dirección de ordenamiento
        setAscending(key);
    };

    // Retorno de los estados y funciones de cambio de estado
    return {
        sortingFields,
        sortingDirections,
        sortingFieldKey,
        ascending,
        setTableSortingField,
        setKanbanSortingField,
        setKanbanAscending,
    };
};

export default useSortingFields;
