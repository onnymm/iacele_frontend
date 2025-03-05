import { useContext } from "react";
import ButtonIcon from "../../ui/button/ButtonIcon";
import ButtonTextIcon from "../../ui/button/ButtonTextIcon";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import FormContext from "../../../contexts/formContext";

/** 
 *  ## Botón de Guardar
 *  Este componente renderiza botón para guardar datos, usando el contexto del
 *  componente {@link DataViewForm}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const ButtonSave: () => (React.JSX.Element | undefined) = () => {

    // Obtención de datos y estado del formulario y función de escritura de datos en el backend
    const { formData, saveData, dataChanged , readonly } = useContext<FormDetail | undefined>(FormContext) as FormDetail;


    // Si el formulario no es de solo lectura se renderiza el botón
    if ( !readonly ) {

        const saveFormData = () => {
            saveData(formData)
        }

        return (
            <div className="flex">
                <div className="md:hidden">
                    <ButtonIcon icon={CloudArrowUpIcon} type="success" onClick={saveFormData} disabled={!dataChanged}/>
                </div>
                <div className="hidden md:flex">
                    <ButtonTextIcon icon={CloudArrowUpIcon} type="success" onClick={saveFormData} disabled={!dataChanged}>
                        Guardar
                    </ButtonTextIcon>
                </div>
            </div>
        )
    }
}

export default ButtonSave;
