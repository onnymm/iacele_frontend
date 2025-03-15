/**
 *  ## Efecto de pulso
 *  Esta función crea un efecto de pulso en el botón que recibe un evento de
 *  clic. Él botón en cuestión debe tener la propiedad `position` en `relative`
 *  para poder crear el efecto adecuadamente.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link MouseEvent<HTMLButtonElement>} ] `event`: Evento de clic.
 *  - [ `string` ] `backgroundClassNames`: Nombres de clases CSS separadas por
 *  espacios, para dar color al fondo del elemento del cículo creado.
 */ 
export const createCircle: (
    event: React.MouseEvent<HTMLButtonElement>,
    backgroundClassNames: string
) => (void) = (
    event,
    backgroundClassNames,
) => {

    if ( !event.currentTarget ) return;

    // Obtención del elemento HTML
    const buttonElement = event.currentTarget;

    // Creación del elemento con forma de círculo
    const circle = document.createElement("span");

    // Obtención de las coordenadas del cuadro del botón
    const rect = buttonElement.getBoundingClientRect();

    // Definición de las coordenadas para ubicar el círculo
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Adición de clases para estilización
    circle.classList.add("circle");

    backgroundClassNames.split(" ").forEach(
        // Se añaden los nombres de las clases provistas a la función;
        (className) => {
            circle.classList.add(className);
        }
    )

    // Definición de la altura y ancho del círculo
    circle.style.width = `${buttonElement.offsetWidth}px`;
    circle.style.height = `${buttonElement.offsetWidth}px`;

    // Definición de coordenadas del círculo
    circle.style.left = `${x - buttonElement.offsetWidth / 2}px`;
    circle.style.top = `${y- buttonElement.offsetWidth / 2}px`;

    // Escuchador de evento para desaparecer cuando terminó de animarse
    circle.addEventListener(
        'animationend',
        () => circle.remove(),
    );

    // Se añade el círculo al botón
    buttonElement.appendChild(circle);
};
