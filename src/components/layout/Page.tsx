/** 
 *  ## Página de datos
 *  Este componente renderiza una página de datos para poder posicionar
 *  elementos de UI y crear vistas.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */
const Page: (config: GenericInvolverComponent) => (React.JSX.Element) = ({
    children,
}) => {

    return (
        <div className="group ui-page-layout-group flex flex-col gap-2 w-full h-max h-min-full">
            {children}
        </div>
    );
};

export default Page;
