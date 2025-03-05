/** 
 *  ## Hoja de datos
 *  Este componente renderiza una hoja en donde se pueden insertar diversos
 *  elementos UI para mostrar información.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Sheet: (config: GenericInvolverComponent) => (React.JSX.Element) = ({
    children,
}) => {

    return (
        <div className="bg-white dark:bg-[#1f2f3f] shadow-md p-4 border border-gray-500/20 rounded-lg w-full min-w-screen h-min min-h-[calc(100%_-_3rem)] size-full">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {children}
            </div>
        </div>
    );
};

export default Sheet;
