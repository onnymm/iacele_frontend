import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { parseDisplayValue, parseTo } from "../../core";
import FormContext from "../../../../contexts/formContext";
import Field from "../Field";
import useRecordValue from "../../../../hooks/form/useRecordValue";
import KeyboardInput from "./KeyboardInput";
import CheckInput from "./CheckInput";

/** 
 *  ## Input de formulario
 *  Este componente renderiza un input editable o de solo lectura, que obtiene
 *  los datos del contexto de vista del componente {@link DataViewForm} y se
 *  usa en el componente {@link Field}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `title`: Nombre visible del campo en el placeholder.
 *  - [ {@link IACele.Types.TypeName} ] `type`: Tipo de valor del campo.
 *  - [ `boolean` ] `readonly`: Modo "sólo lectura".
 */ 
const InputForm: (config: IACele.UI.Field) => (React.JSX.Element) = ({
    name,
    type,
    title,
    readonly,
}) => {

    // Función de parseo de valor
    const parseValueToDisplay = useMemo(() => parseDisplayValue[type], [type]);

    // Función de formateo de valor de input
    const formatRecordValue = useMemo(() => parseTo[type], [type]);

    // Obtención de los datos del registro y funciones de cambio  de estado
    const { recordData, setDataChanged, setFormValue, dataChanged, reload, setReload } = useContext<IACele.View.Form.Context | undefined>(FormContext) as IACele.View.Form.Context;
    // Creación de estado de valor de campo actual
    const [ recordValue, setRecordValue ] = useRecordValue(recordData.data[name]);

    // Creación de dato estático que almacena el valor original proveniente del backend
    const originalValue = useRef<string | number | undefined>(recordData.data[name] ?? undefined);

    // Valor a mostrar en el campo
    const [ displayValue, setDisplayValue ] = useState<string | boolean>(parseValueToDisplay(recordValue));

    // Estado de campo enfocado
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    useEffect(
        () => {
            // Actualización de valor del campo si los datos provenientes del backend cambian
            setRecordValue(recordData.data[name]);
            setDisplayValue(parseValueToDisplay(recordData.data[name]));
        }, [recordData.data, name, setRecordValue, parseValueToDisplay]
    );

    // Si el valor estático cambia significa que se hizo recarga de datos
    useEffect(
        () => {
            if ( originalValue.current === recordData.data[name] ) return;
            // Se cambia el indicador de cambio de datos a falso
            setDataChanged(false);
            // Se actualiza el valor estático al valor actualizado de la base de datos
            originalValue.current = recordData.data[name];
        }, [recordData.data, setDataChanged, name]
    );

    // Si el indicador de cambios cambia a falso significa que se guardaron los datos y se establece el valor del formulario al valor original
    useEffect(
        () => {
            if ( dataChanged ) return;
            if ( Object.is(recordValue, originalValue.current) ) return;
            // Cambio del valor del registro
            setRecordValue( originalValue.current );
            // Cambio del valor mostrado
            setDisplayValue( parseValueToDisplay(originalValue.current) );
        }, [recordValue, dataChanged, parseValueToDisplay, setRecordValue]
    );

    // Si se detecta un cambio en el estado del valor pero su valor es igual
    //      al original y el estado de carga es activo, se cambia el estado
    //      de carga a inactivo
    useEffect(
        () => {
            if ( !reload ) return;
            if ( Object.is(recordValue, originalValue.current) ) {
                setReload(false);
            }
        }, [recordValue, reload, setReload]
    );

    if ( type === 'char' || type === 'float' || type === 'integer' || type === 'monetary' || type === 'percentage' || type === 'date' ) {

        return (
            <KeyboardInput
                    name={name}
                    title={title}
                    type={type}
                    readonly={readonly}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    recordValue={recordValue}
                    displayValue={displayValue}
                    setDisplayValue={setDisplayValue}
                    formatRecordValue={formatRecordValue}
                    setFormValue={setFormValue}
                    setRecordValue={setRecordValue}
                    parseValueToDisplay={parseValueToDisplay}
                    setDataChanged={setDataChanged}
            />
        );

    } else {
        return (
            <CheckInput
                recordValue={recordValue as boolean}
                name={name}
                type={type}
                title={title}
                readonly={readonly}
                displayValue={displayValue as boolean}
                setRecordValue={setRecordValue}
                setDataChanged={setDataChanged}
                setFormValue={setFormValue}
                isFocused={isFocused}
            />
        );
    }
};

export default InputForm;
