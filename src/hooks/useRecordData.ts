import { useCallback, useEffect, useState } from "react"
import { read } from "../api/crud";

/** 
 *  ## Obtención de datos de un registro
 *  Este Custom Hook recibe una ID de registro, un nombre de tabla de base de
 *  datos y retorna funciones para ser utilizadas en el contexto del componente
 *  DataViewForm.
 *  
 *  ### Parámetros de entrada
 *  - [ `number` ] `id`: ID del registro a buscar.
 *  - [ {@link DatabaseTable} ] `table`: Nombre de la tabla de base de datos
 *  para realizar la búsqueda.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link RecordDetail | undefined} ] `recordData`: Datos del registro
 *  encontrado.
 *  - [ {@link DataRecord} ] `formData`: Datos a renderizar en la vista de
 *  formulario.
 *  - [ `undefined` ] `setFormValue`: Función de cambio de estado para
 *  preparación de los datos al backend en una escritura.
 *  - [ `boolean` ] `reload`: Estado de recarga.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `setReload`:
 *  Función de cambio de estado de recarga.
 *  - [ `function` ] `reloadData`: Función para ejecutar una recarga de datos.
 *  - [ `function` ] `undoChanges`: Función para deshacer los cambios hechos
 *  por un usuario en la vista del formulario.
 */ 
const useRecordData = (
    id: number,
    table: IACele.Database.Table,
): {
    recordData: IACele.View.Form.Record | undefined;
    formData: DataRecord;
    setFormValue: (name: string, value: string | number | boolean | undefined) => (void);
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    reloadData: () => (void);
    undoChanges: () => (void);
} => {

    // Datos del registro
    const [ recordData, setRecordData ] = useState<IACele.View.Form.Record | undefined>(undefined);
    // Datos modificables del registro en el formulario
    const [ formData, setFormData ] = useState<DataRecord>({});
    // Estado de control de recarga
    const [ reload, setReload ] = useState<boolean>(false);

    // Función de obtención de los datos desde el backend
    const getData = useCallback(
        async () => {

            // Se obtienen los datos desde la API
            const recordData = await read(id, table);

            // Se establecen los datos en el estado de los datos del formulario
            setFormData(recordData[0]);

            // Se establecen los datos en el estado de los datos del registro
            setRecordData(
                {
                    id,
                    table,
                    data: recordData[0],
                }
            );

        }, [id, table]
    );

    // Función para deshacer cambios
    const undoChanges = useCallback(
        () => {
            // Se sobreescriben los datos del formulario del componente desde los datos originales del registro
            setFormData(recordData?.data as IACele.View.Form.Record['data']);
        }, [recordData]
    )

    // Función para cambiar un valor del registro en el formulario.
    const setFormValue = useCallback(
        (
            (
                name: string,
                value: string | number | boolean | undefined,
            ): void => {

                // Se cambian los datos del estado
                setFormData(
                    (prevFormData: IACele.View.Form.Record['data']) => {
                        return {
                            ...prevFormData,
                            [ name ]: value
                        }
                    }
                )
            }
        ), []
    )

    // Función para invocar una recarga de los datos
    const reloadData = useCallback<() => (void)>(
        () => {
            // Se establece el estado de carga a activo
            setReload( true );
        }, []
    );

    // Obtención de los datos del registro desde el backend
    useEffect(
        () => {
            if ( reload ) return;
            getData();
        }, [getData, reload]
    );

    // Retorno de los estados y funciones
    return {
        reload,
        setReload,
        formData,
        recordData,
        reloadData,
        setFormValue,
        undoChanges
    };
};

export default useRecordData;
