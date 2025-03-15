interface TableNoTecordsParams {
    icon: IconType; // Ícono descriptivo del contexto de los datos de la tabla.
    message: string; // Mensaje descriptivo que indica la ausencia de datos.
}

/** 
 *  ## Ausencia de registros en tabla
 *  Este componente renderiza un indicador de ausencia de datos, para el 
 *  componente {@link Table}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo del contexto de los datos 
 *  de la tabla.
 *  - [ `string` ] `message`: Mensaje descriptivo que indica la ausencia de 
 *  datos.
 */ 
const TableNoRecords: (config: TableNoTecordsParams) => (React.JSX.Element) = ({
    icon: Icon,
    message,
}) => {

    return (
        <div className="flex flex-col justify-center items-center gap-6 size-full">
            <div className="size-16">
                <Icon className="size-full text-gray-500/50" />
            </div>
            <span className="text-gray-500/50 select-none">{message}</span>
        </div>
    );
};

export default TableNoRecords;
