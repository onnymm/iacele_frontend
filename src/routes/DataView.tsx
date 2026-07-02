import QUERY_PARAMS from "@/constants/routes/queryParams";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import VIEW from "@/views/Views";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

interface ViewQueryParams {
    [QUERY_PARAMS.VIEW.ID]: number;
    [QUERY_PARAMS.VIEW.NAME]: keyof typeof VIEW;
};

type QueryParamParser<T> = (q: string | null) => T;

type InputParams <O extends Record<any, any>> = {
    [K in keyof O]: QueryParamParser<O[K]>;
};

interface ViewParams {
    display?: IACele.UI.View.DisplayOption;
};

const DataView = ({
    display = 'screen',
}: ViewParams) => {

    // Obtención de parámetros de query
    const { id: recordId, name: viewDataName } = useGetParams<ViewQueryParams>({
        [QUERY_PARAMS.VIEW.ID]: (q) => (Number(q)),
        [QUERY_PARAMS.VIEW.NAME]: (q) => (q as keyof typeof VIEW),
    })
    // Obtención de la vista a renderizar
    const View = VIEW[viewDataName];

    return (
        <ViewDataContext.Provider value={{ viewDataName, recordId, display }}>
            <View.View />
        </ViewDataContext.Provider>
    );
};

export default DataView;

/**
 *  ### Parámetros query para ruta
 *  Este hook permite obtener varios parámetros de query sin necesidad de
 *  utilizar el hook provisto por React Router. La ventaja de usar este hook
 *  es que se puede proporcionar una función de procesamiento del valor,
 *  principalmente pensada para casteo de valores. Todos los valores obtenidos
 *  son retornados en un objeto de forma conveniente.
 *  
 *  Para mejor comportamiento se debe crear una interfaz para el genérico:
 *  ```ts
 *  interface ViewQueryParams {
 *      [QUERY_PARAMS.VIEW.ID]: number;
 *      [QUERY_PARAMS.VIEW.NAME]: keyof typeof VIEW;
 *  };
 *  ```
 *  
 *  El argumento de entrada debe cumplir con todas las llaves de la interfaz
 *  provista, con la diferencia de que se proporciona una función que debe
 *  recibir un argumento `string` o `null` y retornar el tipo de dato declarado
 *  como valor de la llave en la interfaz.
 *  
 *  ```ts
 *  useGetParams<ViewQueryParams>({
 *      [QUERY_PARAMS.VIEW.ID]: (q) => (Number(q)),
 *      [QUERY_PARAMS.VIEW.NAME]: (q) => (q as keyof typeof VIEW),
 *  })
 *  ```
 *  @param params Nombres de parámetros de query y función de procesamiento de
 *  éstos.
 *  @returns Parámetros de query procesados y listos para usarse.
 */ 
const useGetParams = <T extends Record<string, any>>(params: InputParams<T>): T => {

    // Obtención de parámetros de query
    const [ searchParams ] = useSearchParams();
    // Obtención de los valores de parámetros de query
    const queryValues = useMemo(
        () => {
            // Obtención de nombres de parámetros de query a obtener
            const queryParamNames = Object.keys(params) as (keyof T)[];
            // Inicialización de objeto de valores
            const values = {} as T;
            // Iteración por cada nombre de parámetro query
            queryParamNames.forEach(
                (queryParam) => {
                    // Obtención de valor
                    const queryValue = searchParams.get(queryParam as string);
                    // Obtención de función de procesamiento de valor de query
                    const processValue = params[queryParam];
                    // Procesamiento de valor de query
                    const processedValue = processValue(queryValue);
                    // Se almacena el valor procesado en el objeto de valores
                    values[queryParam] = processedValue;
                }
            );

            return values;
        }, [params, searchParams]
    );

    return queryValues;
};
