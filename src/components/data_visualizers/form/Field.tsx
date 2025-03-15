import { useContext } from "react";
import FormContext from "../../../contexts/formContext";
import InputFormReadonly from "./components/InputFormReadonly";
import InputForm from "./components/InputForm";
import DataViewForm from "../DataViewForm"; // eslint-disable-line

/** 
 *  ## Campo de formulario
 *  Este componente renderiza un campo editable o de solo lectura, que obtiene
 *  los datos del contexto de vista del componente {@link DataViewForm}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre del campo en la tabla de la base de datos.
 *  - [ `string` ] `title`: Nombre visible del campo en el placeholder.
 *  - [ {@link IACele.Types.TypeName} ] `type`: Tipo de valor del campo.
 *  - [ `boolean` ] `readonly`: Modo "sólo lectura".
 */ 
const Field: (config: IACele.UI.Field) => (React.JSX.Element) = ({
    name,
    title,
    type,
    readonly: fieldReadonly = false,
}) => {

    // Estado de solo lectura del formulario
    const { readonly: formReadonly } = useContext(FormContext) as IACele.View.Form.Context;

    // Si el formulario es solo lectura...
    if ( formReadonly ) {
        return (
            // Retorno de campo no modificable
            <InputFormReadonly name={name} type={type} title={title} />
        );
    } else {
        return (
            // Retorno de campo modificable
            <InputForm name={name} type={type} title={title} readonly={fieldReadonly} />
        );
    }
};

export default Field;
