interface FallbackParams {
    icon: IconType; // Ícono descriptivo del componente en el cual se usa este componente.
};

/** 
 *  ## En espera de datos
 *  Este componente renderiza un contenedor que indica un estado de carga, en 
 *  espera de respuesta con datos por parte del backend.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IconType} ] `icon`: Ícono descriptivo del componente en el cual 
 *  se usa este componente.
 */ 
const Fallback: (config: FallbackParams) => (React.JSX.Element) = ({
    icon: Icon,
}) => {

    return (
        <div className='relative flex flex-grow justify-center items-center bg-slate-200 dark:bg-slate-600 rounded-lg min-h-full transition-dark animate-pulse'>
            {/* Ícono con efecto de pulso */}
            <Icon className='opacity-50 dark:opacity-60 dark:text-white transition-dark size-16' />
            {/* Ícono estático */}
            <Icon className='absolute opacity-60 dark:text-white transition-dark animate-ping size-12' />
        </div>
    )
}

export default Fallback;
