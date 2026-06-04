import useAPI from "@/hooks/app/useAPI";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";

interface TreeParams<M extends IACele.Data.ModelName> {
    modelName: M;
    children: (params: RenderParams<M>) => React.ReactNode;
};

interface RenderParams<M extends IACele.Data.ModelName> {
    Field: React.FC<FieldParams<M>>;
};

interface TreeContextParams<M extends IACele.Data.ModelName> {
    fieldsToRead: (keyof IACele.Data.ModelDefinition<M>)[];
    suscribeFieldToRead: (fieldName: keyof IACele.Data.ModelDefinition<M>) => void;
};

interface FieldParams<M extends IACele.Data.ModelName> {
    name: keyof IACele.Data.ModelDefinition<M>;
};

const useTree = <M extends IACele.Data.ModelName>(
    modelName: M,
) => {

    // Obtención de la instancia de conexión a la API
    const { api } = useAPI();

    // Inicialización de lista de campos a leer
    const fieldsToRead: (keyof IACele.Data.ModelDefinition<M>)[] = useMemo(
        () => ([]), []
    );

    // Inicialización de función para añadir nombres de campos a leer
    const suscribeFieldToRead = useCallback(
        (fieldName: keyof IACele.Data.ModelDefinition<M>) => {
            // Se busca el valor del campo en el array
            const foundValue = fieldsToRead.find( (value) => (value === fieldName) );
            // Si el nombre del campo no existe en el array...
            if ( !foundValue ) {
                // Se añade éste
                fieldsToRead.push(fieldName);
            };
        }, [fieldsToRead]
    );

    // Inicialización de función de búsqueda y lectura de resultados
    const searchRead = useCallback(
        async () => {
            const data = await api.tree({
                'model_name': modelName,
                'fields': fieldsToRead,
            })
            console.log(data);
        }, [api, fieldsToRead, modelName]
    );

    return { fieldsToRead, suscribeFieldToRead, searchRead };
};

const Tree = <M extends IACele.Data.ModelName>({
    modelName,
    children,
}: TreeParams<M>) => {

    const { fieldsToRead, suscribeFieldToRead, searchRead } = useTree<M>(modelName);

    useEffect(
        () => {
            console.log(fieldsToRead);
        }, [fieldsToRead]
    );

    useEffect(
        () => {
            searchRead();
        }, [searchRead]
    );

    return (
        <TreeContext.Provider value={{
            fieldsToRead,
            suscribeFieldToRead: suscribeFieldToRead as (fieldName: any) => void
        }}>
            {children({ Field })}
        </TreeContext.Provider>
    );
};

export default Tree;

const TreeContext = createContext<TreeContextParams<any>>({
    fieldsToRead: [],
    suscribeFieldToRead: () => null,
})

const Field = <M extends IACele.Data.ModelName>({
    name,
}: FieldParams<M>) => {

    const { suscribeFieldToRead } = useContext(TreeContext);

    suscribeFieldToRead(name);

    return null;
};
