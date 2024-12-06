/** 
 *  ## Encabezado de vista
 *  Este componente renderiza un encabezado en el que se pueden colocar
 *  componentes como menús o barras de estado y se ajustarán al ancho de la
 *  pantalla.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */
const Header: (config: GenericInvolverComponent) => (React.JSX.Element) = ({
    children,
}) => {

    return (
        <div className="flex flex-wrap gap-2 h-min">
            {children}
        </div>
    )
}

export default Header;
