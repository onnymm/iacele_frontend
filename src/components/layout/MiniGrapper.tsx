import { GenericInvolverComponent } from "../../types/commonTypes";
import Group from "./Group"; // eslint-disable-line

interface MiniGrapperParams extends GenericInvolverComponent {
    groupDivisions?: boolean;
}

/** 
 *  ## Minicontenedor
 *  Este componente renderiza un minicontenedor para un formulario de inicio de 
 *  sesión o registro de usuario.
 *   
 *  `< tsx />` Se autocierra.
 *   
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `groupDivisions`: Indicador de si los elementos
 *  <{@link Group} /> contenidos renderizarán una línea divisora.
*/
const MiniGrapper: (config: MiniGrapperParams) => (React.JSX.Element) = ({
    children,
    groupDivisions = false,
}) => {

    return (
        <div className={`${groupDivisions ? 'group line-division' : ''} flex flex-col gap-2 border-gray-500/50 bg-gray-500/10 m-2 p-4 border rounded-lg sm:w-[320px] max-w-screen`}>
            { children }
        </div>
    )
}

export default MiniGrapper;
