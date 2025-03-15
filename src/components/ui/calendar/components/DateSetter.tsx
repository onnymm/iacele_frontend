import React, { useContext, useEffect } from "react";
import Calendar from "../Calendar";
import useDate from "../../../../hooks/form/useDate";
import FormContext from "../../../../contexts/formContext";

interface DateSetterParams {
    value: string; // Valor de fecha.
    setValue: React.Dispatch<React.SetStateAction<string>>; // Función de cambio de estado de fecha.
    name: string; // Nombre del campo que se manipula, para hacer la actualización de datos cuando el registro cambia desde el backend.
}

/** 
 *  ## Cambio de fecha
 *  Este componente renderiza un calendario que manipula el valor de un campo 
 *  de formulario.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `value`: Valor de fecha.
 *  - [ {@link React.Dispatch<React.SetStateAction<string>>} ] `setValue`:
 *  Función de cambio de estado de fecha.
 *  - [ `string` ] `name`: Nombre del campo que se manipula, para hacer la
 *  actualización de datos cuando el registro cambia desde el backend.
 */ 
const DateSetter: (config: DateSetterParams) => (React.JSX.Element) = ({
    value,
    setValue,
    name,
}) => {

    // Obtención de los datos del formulario para restaurar el valor cuando se retornen datos del backend
    const { recordData } = useContext<IACele.View.Form.Context | undefined>(FormContext) as IACele.View.Form.Context;
    // Obtención de valores para uso en componente de calendario
    const [ date, setDate, todayRef ] = useDate(value);

    // Restauración del valor cuando los datos del registro cambian
    useEffect(
        () => {
            setDate(recordData.data[name]);
        }, [recordData.data, setDate, name]
    );

    // Se cambia el valor del formulario cuando una fecha es seleccioanada por el usuario
    useEffect(
        () => {
            setValue(date);
        }, [date, setValue]
    );

    return (
        <Calendar date={date} setDate={setDate} todayRef={todayRef} />
    );
};

export default React.memo(DateSetter);
