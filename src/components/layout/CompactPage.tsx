import { GenericInvolverComponent } from "../../types/commonTypes";

/** 
 *  ## Página compacta
 *  Este componente renderiza un contenedor de página compacta.
 *  
 *  Este componente sirve para envolver elementos y mapearlos en display flex o
 *  grid así como para darles un estilizado y espacio homogéneos y poder
 *  construir vistas de forma muy rápida.
 *   
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *   
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const CompactPage: (config: GenericInvolverComponent) => (React.JSX.Element) = ({
    children,
}) => {

    return (
        <main className="flex justify-center items-center h-full">
            { children }
        </main>
    )
}

export default CompactPage;
