import { useCallback, useState } from "react";

const useSearchRecord = <M extends IACele.Data.ModelName>(
    fieldDomain: IACele.Data.CriteriaStructure<M>,
    idsIndex: number[],
) => {

    const joinDomainAndIndex = useCallback(
        () => {
            // Construcción de criterio para descartar IDs existentes
            const notIntoExistingIds: IACele.Data.CriteriaStructure<M> = [['id', 'not in', idsIndex]];
            // Si el dominio está vacío...
            if ( fieldDomain.length === 0 ) {
                return (notIntoExistingIds);
            // Si el dominio no está vacío...
            } else {
                // Se unen el dominio y el criterio para descartar IDs existentes
                const combinedCondition: IACele.Data.CriteriaStructure<M> = ['&', ...fieldDomain, ...notIntoExistingIds];

                return combinedCondition;
            }
        }, [fieldDomain, idsIndex]
    );

    const buildSearchCriteria = useCallback(
        (inputText: string) => {

            // Construcción de criterio de búsqueda base
            const baseSearchCriteria = joinDomainAndIndex();

            // Si el texto de búsqueda está vacío...
            if ( inputText === '' ) {
                // Se retorna el criterio base
                return baseSearchCriteria;
            // Si existe texto de búsqueda...
            } else {
                // Construcción de búsqueda por nombre a mostrar contiene...
                const displayNameContains: IACele.Data.CriteriaStructure<M> = [['display_name', '=', inputText]];
                // Construcción de criterio de búsqueda con filtro de búsqueda de texto
                const searchCriteria: IACele.Data.CriteriaStructure<M> = ['&', ...baseSearchCriteria, ...displayNameContains];

                return searchCriteria;
            };
        }, [joinDomainAndIndex]
    );

    // Inicialización de estado de texto de búsqueda
    const [ searchText, setSearchText ] = useState<string>('');
    // Inicialización de estado de criterio de búsqueda
    const [ searchCriteria, setSearchCriteria ] = useState<IACele.Data.CriteriaStructure<M>>(buildSearchCriteria(searchText));

    // Función para actualizar el criterio de búsqueda a usar
    const updateSearchCriteria = useCallback(
        (inputText: string) => {
            // Se establece el nuevo valor de texto de búsqueda
            setSearchText(inputText);
            // Construcción de valor del nuevo criterio de búsqueda
            const value = buildSearchCriteria(inputText);
            // Se establece el valor del criterio de búsqueda
            setSearchCriteria(value);
        }, [buildSearchCriteria]
    );

    return { searchText, searchCriteria, updateSearchCriteria };
};

export default useSearchRecord;
