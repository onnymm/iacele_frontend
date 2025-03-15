interface BaseInterfaceButton {
    icon: IconType;
    callback: () => (void);
}

/** 
 *  ## Botón para barra lateral
 *  Este componente renderiza un botón para el encabezado de la barra lateral
 *  de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IconType} ] `icon`: Ícono del botón.
 *  - [ `() => (void)` ] `callback`: Función a ejecutar.
 */ 
const Button: (config: BaseInterfaceButton) => (React.JSX.Element) = ({
    icon: Icon,
    callback,
}) => {

    return (
        <button onClick={callback} className="size-14 sm:size-12">
            <div className="p-2 size-full">
                <Icon className="fill-white size-10 sm:size-8" />
            </div>
        </button>
    );
};

export default Button;
