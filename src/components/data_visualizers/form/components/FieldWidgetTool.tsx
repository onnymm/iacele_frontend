interface FieldWidgetTriggerParams {
    icon: IconType; // Ícono que representa la funcionalidad del widget a integrar.
    setShow: React.Dispatch<React.SetStateAction<boolean>>; // Función de cambio de estado para mostrar u ocultar widget.
    isFocused: boolean; // Estado para resaltar el color del ícono.
}

/** 
 *  ## Interruptor de widget de campo editable
 *  Este componente renderiza un interruptor que muestra u oculta un widget de
 *  edición de valor de un campo de formulario.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IconType} ] `icon`: Ícono que representa la funcionalidad del
 *  widget a integrar.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `setShow`:
 *  Función de cambio de estado para mostrar u ocultar widget.
 *  - [ `boolean` ] `isFocused`: Estado para resaltar el color del ícono.
 */ 
const FieldWidgetTrigger: (config: FieldWidgetTriggerParams) => (React.JSX.Element) = ({
    icon: Icon,
    setShow,
    isFocused,
}) => {

    return (
        <div
            onClick={() => setShow( (prevState) => (!prevState) )}
            className="size-5 pointer-events-auto"
        >
            <Icon className={`${isFocused ? 'fill-main-500' : ''} hover:fill-main-500 transition duration-200`} />
        </div>
    );
};

export default FieldWidgetTrigger;
