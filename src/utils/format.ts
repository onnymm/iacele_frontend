const twoDigits = (value: number): string => (
    value < 10
        ? `0${value}`
        : String(value)
);

const format = {

    date: (value: string) => (
        value
        .split('-')
        .reverse()
        .join('/')
    ),

    time: (value: string) => {
        const [ hours, minutes, seconds ] = value.split(':');
        let numericHours = Number(hours);
        const m = (
            numericHours < 12
                ? 'a.m.'
                : 'p.m.'
        );
        numericHours = (
            numericHours < 12
                ? numericHours
                : numericHours - 12
        );
        const stringHours = (
            numericHours < 10
                ? `0${numericHours}`
                : String(numericHours)
        );
        const formatedValue = `${stringHours}:${minutes}:${seconds} ${m}`;

        return formatedValue;
    },

    duration: (value: [number, number, number]) => {
        const [ hours, minutes, seconds ] = value.map(twoDigits);
        const formatedValue = `${hours}:${minutes}:${seconds}`;

        return formatedValue;
    },

} as const;

export default format;
