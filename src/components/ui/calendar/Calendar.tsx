import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import useCalendar from "../../../hooks/ui/useCalendar";
import { shortDayNames } from "../../../constants/date";
import StaticButton from "./components/StaticButton";
import DayName from "./components/DayName";
import CalendarButtonDay from "./components/DayBlock";
import useDate from "../../../hooks/form/useDate"; // eslint-disable-line

interface CalendarParams {
    date: string; // Fecha en cadena de texto.
    setDate: React.Dispatch<React.SetStateAction<string | Date>>; // Función de cambio de estado de fecha.
    todayRef: React.MutableRefObject<string>; // Objeto useRef del día actual, proveniente del hook {@link useDate}
};

/** 
 *  ## Calendario
 *  Este componente renderiza un calendario que resalta el día en curso y
 *  permite seleccionar un valor de fecha.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `date`: Fecha en cadena de texto.
 *  - [ {@link React.Dispatch<React.SetStateAction>} ]
 *  `setDate`: Función de cambio de estado de fecha.
 *  - [ {@link React.MutableRefObject<string>} ] `todayRef`: Objeto useRef del
 *  día actual, proveniente del hook {@link useDate}
 */ 
const Calendar: (config: CalendarParams) => (React.JSX.Element) = ({
    date,
    setDate,
    todayRef,
}) => {

    // Obtención de valores para uso en diccionario
    const { calendar, visibleDays, changeMonth } = useCalendar(date);

    return (
        <div className="flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow-md p-2 rounded-md w-min select-none">
            <div className="flex flex-row justify-between items-center px-2">
                <StaticButton icon={ArrowLeftIcon} onClick={() => changeMonth(-1)} />
                <span className="text-sm">{calendar.monthName()} {calendar.current.year}</span>
                <StaticButton icon={ArrowRightIcon} onClick={() => changeMonth(1)} />
            </div>
            <div className="grid grid-cols-7 shadow-md rounded-sm w-56">
                {
                    shortDayNames.map(
                        (day, index) => (
                            <DayName key={index}>{day}</DayName>
                        )
                    )
                }
                {
                    visibleDays.map(
                        (monthDay, index) => (
                            <CalendarButtonDay monthDay={monthDay} date={date} setDate={setDate} today={todayRef} key={index} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Calendar;
