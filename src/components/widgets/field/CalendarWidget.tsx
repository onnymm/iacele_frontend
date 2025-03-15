import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import FieldWidgetTrigger from "../../data_visualizers/form/components/FieldWidgetTool";
import FieldDropdown from "../../misc/FieldDropdown";
import DateSetter from "../../ui/calendar/components/DateSetter";
import { CalendarIcon } from "@heroicons/react/24/solid";

interface CalendarToolParams {
    name: string; // Nombre del campo en la tabla de la base de datos.
    displayValue: string; // Valor a mostrar en el campo.
    recordValue: IACele.Types.ValueType; // Valor del campo del registro del formulario.
    isFocused: boolean; // El campo está enfocado.
    setRecordValue:  (newValue: IACele.Types.ValueType) => (void); // Función de cambio de estado de valor del registro.
    setDataChanged: React.Dispatch<React.SetStateAction<boolean>>; // Función de cambio de estado de cambio de datos.
    setFormValue: (name: string, value: string | number | boolean | undefined) => (void); // Función de cambio de estado de valor de formulario.
    setDisplayValue: React.Dispatch<React.SetStateAction<string | boolean>>; // Función de cambio de estado de valor a mostrar en el campo.
    parseValueToDisplay: (value: IACele.Types.ValueType) => string | boolean; // Función para parsear el valor a mostrar en el campo.
}

/** 
 *  ## Widget de calendario
 *  Este componente renderiza un widget de formulario que integra un calendario
 *  para manipular el valor de fecha de un campo de formulario.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `displayValue`: Valor a mostrar en el campo.
 *  - [ {@link IACele.Types.ValueType} ] `recordValue`: Valor del campo del
 *  registro del formulario.
 *  - [ `boolean` ] `isFocused`: El campo está enfocado.
 *  - [ `undefined` ] `setRecordValue`: Función de cambio de estado de valor
 *  del registro.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ]
 *  `setDataChanged`: Función de cambio de estado de cambio de datos.
 *  - [ `undefined` ] `setFormValue`: Función de cambio de estado de valor de
 *  formulario.
 *  - [ {@link React.Dispatch<React.SetStateAction>} ]
 *  `setDisplayValue`: Función de cambio de estado de valor a mostrar en el
 *  campo.
 *  - [ `undefined` ] `parseValueToDisplay`: Función para parsear el valor a
 *  mostrar en el campo.
 */ 
const CalendarTool: (config: CalendarToolParams) => (React.JSX.Element) = ({
    name,
    setFormValue,
    isFocused,
    recordValue,
    setRecordValue,
    setDataChanged,
    setDisplayValue,
    parseValueToDisplay,
}) => {

    // Estado, referencia y custom hook para mostrar el calendario
    const [ showCalendar, setShowCalendar ] = useState<boolean>(false);
    const widgetRef = useRef(null);
    useClickOutside(widgetRef, () => setShowCalendar(false))

    const originalValueRef = useRef<string | undefined>(recordValue as IACele.Types.Date)

    useEffect(
        () => {
            if ( recordValue === originalValueRef.current ) {
                setDisplayValue(parseValueToDisplay(recordValue))
            }
        }, [recordValue, parseValueToDisplay, setDisplayValue]
    )

    const dateSetterSetValue = useCallback<(val: string) => void>(
        (val: string) => {
            console.log(val, originalValueRef.current);
            setDisplayValue(parseValueToDisplay(val))
            if ( val !== originalValueRef.current ) setDataChanged(true);
            setRecordValue(val)
            setFormValue(name, val)
        }, [name, setFormValue, parseValueToDisplay, setDataChanged, setRecordValue, setDisplayValue]
    )

    return (
        <div
            className="top-1 absolute flex flex-row justify-end items-center pr-2 w-full h-8 pointer-events-none"
            ref={widgetRef}
        >
            <FieldWidgetTrigger setShow={setShowCalendar} isFocused={isFocused} icon={CalendarIcon} />
            <FieldDropdown show={showCalendar}>
                <DateSetter
                    value={parseValueToDisplay(recordValue) as string}
                    setValue={dateSetterSetValue as React.Dispatch<React.SetStateAction<string>>}
                    name={name}
                />
            </FieldDropdown>
        </div>
    )
}

export default CalendarTool;
