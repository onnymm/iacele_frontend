import Check from "../../../ui/check/Check";

interface CheckInputParams extends IACele.UI.Core.Input {
    recordValue: boolean; // Valor de registro.
}

/** 
 *  ## Campo de checkbox
 *  Este componente renderiza un campo booleano manipulable por un checkbox.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `title`: Nombre visible del campo en el placeholder.
 *  - [ {@link IACele.Types.TypeName} ] `type`: Tipo de valor del campo.
 *  - [ `boolean` ] `readonly`: Modo "sólo lectura".
 *  - [ `string | boolean` ] `displayValue`: Valor a mostrar en el campo.
 *  - [ `boolean` ] `isFocused`: El campo está enfocado.
 *  - [ `undefined` ] `setRecordValue`: Función de cambio de estado de valor
 *  del registro.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ]
 *  `setDataChanged`: Función de cambio de estado de cambio de datos.
 *  - [ `undefined` ] `setFormValue`: Función de cambio de estado de valor de
 *  formulario.
 *  - [ `boolean` ] `recordValue`: Valor de registro.
 */ 
const CheckInput: (config: CheckInputParams) => (React.JSX.Element) = ({
    name,
    title,
    readonly = false,
    setRecordValue,
    setDataChanged,
    setFormValue,
    recordValue,
}) => {

    // Función para uso en check
    const updateValue = (
        callback: (prevState: boolean) => (boolean)
    ) => {
        // Se indica que hay cambios
        setDataChanged(true)
        // Creación de nuevo valor a partir de función
        const newState = callback(recordValue)
        // Se establece el nuevo valor en el formulario y en el componente
        setFormValue(name, newState)
        setRecordValue(newState)
    }

    // Función de cambio de estado solo cuando el componente está activo.
    const onClickCallback = () => {
        if ( readonly ) return;
        updateValue( (prevState) => (!prevState) );
    }

    return (
        <div className={`relative group group/label flex flex-row justify-end items-end pr-1 h-10`}>
            <div
                className={`${!readonly ? 'hover:text-main-500 dark:hover:text-main-500 cursor-pointer' : ''} absolute flex flex-row justify-between items-end pl-4 size-full text-gray-500 dark:text-gray-400 transition duration-300`}
                onClick={onClickCallback}
            >
                {title}
            </div>
            <Check readonly={readonly} value={recordValue} setValue={updateValue as React.Dispatch<React.SetStateAction<boolean>>} />
        </div>
    )
}

export default CheckInput;
