import CalendarBuilder from "../../../../core/calendar/calendarBuilder"; // eslint-disable-line
import { formatDate } from "../../../../core/calendar/utils";

interface CalendarButtonDayParams {
    date: string; // Fecha en formato de texto.
    setDate: React.Dispatch<React.SetStateAction<string | Date>>; // Función de cambio de estado de valor de fecha.
    monthDay: IACele.UI.Core.CalendarDay; // Objeto de día del mes, contenido en la matriz retornada por {@link calendarBuilder.calendarDays()}
    today: React.MutableRefObject<string>; // Referencia del día de hoy para resaltar el componente si coincide con el día de hoy.
}

/** 
 *  ## Botón de día de calendario
 *  Este componente renderiza un botón para el componente {@link Calendar} que
 *  permite la renderización de los días del mes actual, la última porción de
 *  días del mes anterior y la primera porción de días del mes siguiente.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `date`: Fecha en formato de texto.
 *  - [ {@link React.Dispatch<React.SetStateAction>} ]
 *  `setDate`: Función de cambio de estado de valor de fecha.
 *  - [ {@link IACele.UI.Core.CalendarDay} ] `monthDay`: Objeto de día del mes,
 *  contenido en la matriz retornada por {@link CalendarBuilder.calendarDays()}
 *  - [ {@link React.MutableRefObject<string>} ] `today`: Referencia del día de
 *  hoy para resaltar el componente si coincide con el día de hoy.
 */ 
const CalendarButtonDay: (config: CalendarButtonDayParams) => (React.JSX.Element) = ({
    date,
    setDate,
    monthDay,
    today,
}) => {

    // Obtención de la cadena de texto de fecha
    const day = formatDate(
        new Date(
            monthDay.year,
            monthDay.month,
            monthDay.day
        )
    )

    return (
        <button
            className={`${!monthDay.current ? 'text-gray-500/50' : ''} ${day === today.current ? 'text-main-500 font-bold' : ''} ${day === date ? 'bg-main-500/50 text-white' : ''} hover:bg-main-500 hover:text-white flex flex-row rounded-md cursor-pointer transition duration-200 justify-center items-center w-8 h-8`}
            onClick={() => setDate(day)}
        >
            {monthDay.day}
        </button>
    )
}

export default CalendarButtonDay;
