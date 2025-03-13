import { useRef, useState } from "react";
import CalendarBuilder from "../../core/calendar/calendarBuilder";

/** 
 *  ## Funcionalidad de calendario
 *  Custom Hook crea un objeto de calendario para la funcionalidad de mostrar
 *  los días del mes actual, la última porción del mes anterior y la primera
 *  porción del mes siguiente, además de crear un estado de días visibles y una
 *  función de cambio de mes para mostrar mes anterior o mes siguiente y esto
 *  se pueda renderizar en el componente {@link Calendar}.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `initialDate`: Fecha de referencia inicial.
 */ 
const useCalendar = (initialDate: string) => {

    // Destructuración de valores correspondientes
    const [ year, month, day ] = initialDate.split('-');
    // Creación de valor para el objeto de calendario
    const dateValue = new Date(Number(year), Number(month) - 1, Number(day))

    // Creación de instancia de calendario
    const calendar = useRef<CalendarBuilder>(new CalendarBuilder(dateValue)).current
    // Estado para días visibles
    const [ visibleDays, setVisibleDays ] = useState<IACele.UI.Core.CalendarDay[]>(calendar.calendarDays())

    // Función para cambio de mes
    const changeMonth = (offset: number) => {
        calendar.current.changeTo(offset)
        setVisibleDays(calendar.calendarDays())
    }

    return { calendar, visibleDays, changeMonth }
}

export default useCalendar;
