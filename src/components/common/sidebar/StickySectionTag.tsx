/** 
 *  ## Etiqueta de sección de barra lateral
 *  Este componente renderiza una etiqueta de título para sección de grupos del
 *  menú de barra lateral.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const StickySectionTag: (config: TextInvolverComponent) => (React.JSX.Element) = ({
    children,
}) => {

    return (
        <div className="top-0 z-10 sticky mb-2 px-2 select-none">
            <span className="px-4 py-2 font-medium text-gray-300/50 text-sm uppercase">
                {children}
            </span>
        </div>
    );
};

export default StickySectionTag;
