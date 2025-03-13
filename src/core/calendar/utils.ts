// Función para parsear una fecha a cadena de texto legible por el backend
export const parseDateToString = (rawDate: Date) => {

    // Destructuración de la fecha
    const [ date, ] = rawDate.toLocaleDateString().split(',');
    // Destructuración de año, mes y día
    const [ day, month, year ] = date.split('/');
    // Formateo a cadena de texto
    return `${year}-${Number(month) < 10 ? '0' + month : month}-${Number(day) < 10 ? '0' + day : day}`;
};

// Función para formatear la fecha en formato fecha o texto a formato del backend
export const formatDate = (rawDate: Date | string) => {

    // Inicialización de la variable
    let formattedDate;

    // Si el valor entrante es cadena de texto...
    if ( typeof rawDate === 'string' ) {
        // Se formatea la cadena de texto a formato válido
        formattedDate = formatStringDate(rawDate);

        // Si el formato entrante no era válido se establece hoy como valor
        if ( typeof formattedDate === 'boolean' ) {
            formattedDate = parseDateToString(new Date());
        }

        // Retorno del valor formateado
        return formattedDate;
    } else {

        // Si el valor entrante es fecha, se formatea a texto y se retorna
        return parseDateToString(rawDate);
    }
};

// Función para formatear cadena de texto del campo
export const formatStringDate = (date: string) => {

    // Se valida que el formato sea proveniente del backend
    if ( /\d{4}-\d{2}-\d{2}/.test(date) ) return date;
    // Se valida que se cumpla con el formato de entrada
    if ( !/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.test(date) ) return false;

    // Se cambia el diagonal por guión
    date = date.replace(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/, '$1-$2-$3');

    // Se añade el cero en el día
    date = (
        /^(\d{1})-(\d{2})-(\d{4})$/.test(date)
        ? date.replace(/(\d{1})-(\d{2})-(\d{4})/, '0$1-$2-$3')
        : date
    );

    // Se añade el cero en el mes
    date = (
        /^(\d{2})-(\d{1})-(\d{4})$/.test(date)
        ? date.replace(/(\d{2})-(\d{1})-(\d{4})/, '$1-0$2-$3')
        : date
    );

    // Se formatea el valor para formulario
    date = date.replace(/^(\d{2})-(\d{2})-(\d{4})$/, '$3-$2-$1');

    return date;
};
