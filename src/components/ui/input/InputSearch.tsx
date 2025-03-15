import { useState } from "react";
import InputTemplate from "./_InputTemplate";
import ButtonIcon from "../button/ButtonIcon";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";


interface InputSearchParams {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

/**
 *  ## Componente de búsqueda
 *  Este componente renderiza un campo de búsqueda con botón de borrar
 *  búsqueda. Está construído sobre el componente {@link InputTemplate}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string | boolean` ] `search`: Estado del valor a renderizar en el
 *  campo.
 *  - [ {@link React.Dispatch<React.SetStateAction>} ] `setSearch`: Función de cambio
 *  de estado para
 *  `search`.
 *  - [ `boolean` ] `loading`: Estado de carga de datos desde un API.
 */ 
const InputSearch: (config: InputSearchParams) => (React.JSX.Element) = ({
    search,
    setSearch,
    loading,
}) => {

    // Estado para el texto de búsqueda
    const [ value, setValue ] = useState(search);

    // Función de activación con tecla Enter
    const onEnterCallback = () => {

        // Se desencadena el cambio de estado de texto de búsqueda y estado de carga sólo si el
        //      contenido del campo es distinto al estado
        if ( search !== value ) {
            // Se establece el texto del campo como estado
            setSearch(value);
        }
    }

    // Función para limpiar el campo de búsqueda
    const clearSearchInput = () => {
        
        setValue("");
        setSearch("");
    }

    // Componente de borrar contenido declarado por separado para mejorar legibilidad
    const ButtonDelete = <ButtonIcon icon={XMarkIcon} onClick={clearSearchInput} disabled={!value || loading} type='primary' />;

    return (
        <InputTemplate
            value={value}
            setValue={setValue}
            onEnter={onEnterCallback}
            visiblePlaceholder={"Buscar"}
            icon={MagnifyingGlassIcon}
            loading={loading}
            componentAfter={ButtonDelete}
        />
    );
};

export default InputSearch;
