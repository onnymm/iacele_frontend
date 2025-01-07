import { useEffect, useState } from "react";

const searchTemplate: SearchStructure = {
    text: '',
    method: [],
}

const useSearch: (searchScope: Record<string, SearchType> | undefined) => {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    apiSearch: string;
} = (searchScope) => {

    // Inicialización de valor de texto de búsqueda
    const [ searchText, setSearchText ] = useState<string>("");

    // Inicialización de objeto de parámetros de búsqueda para el backend
    const [ apiSearch, setApiSearch ] = useState<string>(encodeAPISearch(searchTemplate));

    // Cambio de estado search por cada vez que el texto de búsqueda cambie
    useEffect(
        () => {

            // Inicialización de la estructura de datos con arreglo vacío
            const searchStructure: SearchStructure = { ...searchTemplate }

            // Si el texto de búsqueda no está vacío y se proporcionó un alcance de búsqueda
            if ( searchText !== '' && searchScope ) {

                // Se añade el texto de búsqueda
                searchStructure.text = searchText

                // Se crea un objeto de búsqueda por cada campo y su tipo del alcance de búsqueda
                Object.keys(searchScope).forEach(
                    (key) => {
                        searchStructure.method.push(
                            {
                                field: key,
                                type: searchScope[key],
                            }
                        )
                    }
                )

                // Se establece el valor de la estructura de búsqueda como estado de búsqueda para el backend
                setApiSearch(encodeAPISearch(searchStructure));

            // De no haber texto de búsqueda o alcance de búsqueda se establece el estado de búsqueda a indefinido
            } else {
                setApiSearch(encodeAPISearch(searchTemplate));
            }
        }, [searchText, searchScope]

    )

    // Retorno de texto de búsqueda, función de cambio de estado de texto de búsqueda y estructura de búsqueda para el backend
    return { searchText, setSearchText, apiSearch }
}

export default useSearch;

const encodeAPISearch = (searchStructure: SearchStructure) => {

    let method = "";

    searchStructure.method.forEach(
        (param) => {
            if (method !== "") {
                method = method + ","
            }
            method = method + `{"field":"${param.field}","type":"${param.type}"}`
        }
    )

    return `{"text":"${searchStructure.text}","method":[${method}]}`
}
