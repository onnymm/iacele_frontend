import { useState } from "react";
import FormContext from "../../contexts/formContext";
import useRecordData from "../../hooks/useRecordData";
import { update } from "../../api/crud";

interface DataViewForm extends GenericInvolverComponent {
    id: number; // ID del registro a buscar.
    table: IACele.Database.Table; // Nombre de la tabla de base de datos donde se buscará el registro.
    readonly?: boolean; // Formulario de sólo lectura.
}

/** 
 *  ## Formulario de datos
 *  Este componente renderiza un componente de formulario que proporciona a los
 *  elementos hijos los datos de contexto necesarios para mostrar los datos de
 *  un registro en la base de datos.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ `number` ] `id`: ID del registro a buscar.
 *  - [ {@link DatabaseTable} ] `table`: Nombre de la tabla de base de datos
 *  donde se buscará el registro.
 *  - [ `boolean` ] `readonly`: Formulario de sólo lectura.
 */ 
const DataViewForm: (config: DataViewForm) => (React.JSX.Element | undefined) = ({
    id,
    table,
    readonly = false,
    children,
}) => {

    // Obtención de los datos del registro actual y sus estados de formulario
    const { recordData, formData, setFormValue, reload, setReload, reloadData, undoChanges } = useRecordData(id, table)
    // Estado indicador de cambios en el formulario
    const [ dataChanged, setDataChanged ] = useState<boolean>(false);

    // Función para guardar los datos en el backend
    const saveData = async (formData: IACele.View.Form.Record['data']) => {

        // Creación de objeto de envío de datos para sobreescribir
        const dataToSend: DataRecord = {}

        // Se revisan los valores con cambios y se añaden éstos al formulario a enviar al backend
        Object.keys(formData).forEach(
            (key: string) => {
                if ( formData[key] !== recordData?.data[key]  ) {
                    dataToSend[key] = formData[key]
                }
            }
        )

        // Envío de datos a sobreescribir y obtención de respuesta del backend
        const data = await update(id, table, dataToSend)

        // Si la respuesta fue exitosa...
        if ( data ) {
            // Se vuelve a realizar una carga de los datos
            reloadData()
            // Se establece el estado de cambios a falso
            setDataChanged(false);
        }
    }

    // Si los datos ya han sido cargados del backend...
    if ( recordData ) {

        return (
            <FormContext.Provider value={{ reload, setReload, dataChanged, setDataChanged, formData, readonly, recordData, saveData, setFormValue, undoChanges, }}>
                {children}
            </FormContext.Provider>
        )
    }
}

export default DataViewForm;
