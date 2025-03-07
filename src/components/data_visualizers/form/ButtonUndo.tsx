import { useContext } from "react";
import ButtonIcon from "../../ui/button/ButtonIcon";
import ButtonTextIcon from "../../ui/button/ButtonTextIcon";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import FormContext from "../../../contexts/formContext";

/** 
 *  ## Botón de Deshacer cambios
 *  Este componente renderiza botón para deshacer cambios de datos, usando el
 *  contexto del componente {@link DataViewForm}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const ButtonUndo: () => (React.JSX.Element | undefined) = () => {

    // Obtención de los estados y funciones de cambio de estado necesarios del contexto del formulario
    const { dataChanged, readonly, undoChanges, setDataChanged } = useContext<IACele.View.Form.Context | undefined>(FormContext) as IACele.View.Form.Context;

    if ( !readonly ) {
        const undoCallback = () => {
            undoChanges();
            setDataChanged(false);
        };

        return (
            <div className="flex">
                <div className="md:hidden">
                    <ButtonIcon icon={ArrowPathIcon} onClick={undoCallback} disabled={!dataChanged} />
                </div>
                <div className="hidden md:flex">
                    <ButtonTextIcon icon={ArrowPathIcon} onClick={undoCallback} disabled={!dataChanged}>
                        Deshacer
                    </ButtonTextIcon>
                </div>
            </div>
        );
    }
};

export default ButtonUndo;
