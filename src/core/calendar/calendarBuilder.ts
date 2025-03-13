import { monthName } from "../../constants/date";

/** 
 *  ## Constructor de calendario
 *  Esta clase permite realizar la construcción de una vista de días del mes,
 *  considerando el mes anterior y mes siguiente de la vista actual.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `date`: Fecha en cadena de texto.
 */ 
class CalendarBuilder {
    previous: Month;
    current: Month;
    next: Month;

    constructor (value: Date) {

        // Creación de mes actual, anterior y próximo
        this.current = new Month(new Date(value), 0);
        this.previous = new Month(new Date(value), -1);
        this.next = new Month(new Date(value), 1);
    };

    /** 
     *  ## Arreglo de vista de calendario
     *  Este método retorna un arreglo que contiene los días del mes
     *  seleccionario junto con la última porción del mes anterior a éste y
     *  la primera porción del mes siguiente a éste, estructurado para ser
     *  renderizado en la vista de cuadrícula en calendario, comenzando desde
     *  el primer día Domingo del mes seleccionado o el anterior a éste hasta
     *  el último Sábado del mes seleccionado o el siguiente a éste.
     */ 
    calendarDays = () => {

        // Cómputo de longitudes de meses en días
        const previousMonthLength = this.previous.monthDays().length;
        const currentMonthLength = this.current.monthDays().length;

        return [
            // Mes anterior
            ...(
                this.previous
                .monthDays()
                .slice( previousMonthLength - this.current.startingDay )
                .map(
                    (day) => ({
                        day,
                        month: this.previous.month,
                        year: this.previous.year,
                        current: false,
                    })
                )
            ),
            // Mes actual
            ...(
                this.current
                .monthDays()
                .map(
                    (day) => ({
                        day,
                        month: this.current.month,
                        year: this.current.year,
                        current: true,
                    })
                )
            ),
            // Mes próximo
            ...(
                this.next
                .monthDays()
                .slice(0, (7 - (currentMonthLength + this.current.startingDay) % 7))
                .map(
                    (day) => ({
                        day,
                        month: this.next.month,
                        year: this.next.year,
                        current: false,
                    })
                )
            ),
        ];
    };

    /** 
     *  ## Cambio de mes
     *  Este método selecciona el més anterior o el mes siguiente al mes
     *  previamente selccionado y realiza los cambios correspondientes para
     *  actualizar la vista del calendario.
     */ 
    changeTo = (offset: number) => {
        this.current.changeTo(offset);
        this.previous.changeTo(offset);
        this.next.changeTo(offset);
    };

    // Obtención del nombre del mes actual
    monthName = () => {
        return monthName[this.current.month];
    };
}

/** 
 *  ## Mes de calendario
 *  Este componente renderiza Esta clase crea un mes para ser utilizado en el
 *  objeto constructor de calendario.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link Date} ] `baseDate`: Fecha de referencia.
 *  - [ `number` ] `offset`: Desfase de mes.
 */ 
class Month {
    month: number;
    year: number;
    startingDay: number;
    baseDate: Date;

    constructor (
        baseDate: Date, // Fecha de referencia.
        offset: number, // Desfase de mes.
    ) {

        // Inicialización default para evitar advertencias de tipado
        this.startingDay = 0;
        this.year = 2025;

        // Creación de fecha
        baseDate.setMonth(baseDate.getMonth() + offset);
        // Se establece la fecha como atributo de la instancia
        this.baseDate = baseDate;
        // Obtención del mes en número
        this.month = this.baseDate.getMonth();
        // Se establecen los parámetros de año, mes y día de la semana del primer día del mes
        this.setParams();
    };

    private setParams = () => {
        // Actualización de valor de año
        this.year = this.baseDate.getFullYear();
        // Actualización de valor de mes
        this.month = this.baseDate.getMonth();
        // Actualización de valor de día de la semana del primer día del mes
        this.startingDay = new Date(this.year, this.month, 1).getDay();
    }

    changeTo = (offset: number) => {
        // Cambio de mes
        this.baseDate.setMonth(this.baseDate.getMonth() + offset);
        // Actualización de los parámetros
        this.setParams();
    }

    monthDays = () => {

        // Obtención de arreglo de todos los días del mes
        return Array.from(
            {length: monthLength[this.month](this.year)},
            (_, i) => (i + 1),
        );
    };
};

export default CalendarBuilder;


// Función para determinar cuántos días tiene un mes
const monthLength = [
    () => 31,
    (year: number) => year % 4 == 0 ? 29 : 28,
    () => 31,
    () => 30,
    () => 31,
    () => 30,
    () => 31,
    () => 31,
    () => 30,
    () => 31,
    () => 30,
    () => 31,
];
