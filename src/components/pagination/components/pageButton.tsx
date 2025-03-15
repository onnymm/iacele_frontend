import Pagination from "../Pagination"; // eslint-disable-line

interface PageButtonParams {
    value: number | string;
    callback: () => (void);
    disabled: boolean;
}

/** 
 *  ## Botón de paginación
 *  Este componente renderiza un botón de paginación que muestra un acceso a la 
 *  página de un conjunto de datos, usado para el componente {@link Pagination}
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link number | string} ] `value`: Valor a renderizar en un botón con 
 *  acceso a la página o un contenedor estático
 *  - [ `function` ] `callback`: Función de acceso a la página
 *  - [ `boolean` ] `disabled`: Deshabilitado
 */ 
const PageButton: (config: PageButtonParams) => (React.JSX.Element) = ({
    value,
    callback,
    disabled,
}) => {

    // Si el tipo de valor es numérico se retorna un botón con acceso a la página
    if ( typeof value === "number" ) {

        return (
            <button
                onClick={callback}
                className={`${!disabled ? "hover:bg-gray-500/20" : ""} flex justify-center items-center rounded-xl size-10 transition-colors duration-300`}
                disabled={disabled}
            />
        );

    // Si el tipo de valor es un texto se retorna un contenedor estático
    } else {
        return (
            <div className="flex justify-center items-center size-10 transition-colors" />
        );
    }
};

export default PageButton;
