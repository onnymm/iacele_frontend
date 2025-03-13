interface StaticButtonParams {
    icon: IconType; // Ícono que representa la funcionalidad del botón.
    onClick: () => void; // Función a ejecutar cuando el botón se presiona.
};

/** 
 *  ## Botón estático
 *  Este componente renderiza un botón estático con un ícono, para ejecutar una
 *  función sencilla.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IconType} ] `icon`: Ícono que representa la funcionalidad del
 *  botón.
 *  - [ `function` ] `onClick`: Función a ejecutar cuando el botón se presiona.
 */
const StaticButton: (config: StaticButtonParams) => React.JSX.Element = ({
    icon: Icon,
    onClick,
}) => {

    return (
        <button onClick={onClick}>
            <Icon className="fill-current hover:fill-main-500 dark:hover:fill-main-500 dark:fill-white min-w-6 h-6 transition duration-200" />
        </button>
    );
};

export default StaticButton;
