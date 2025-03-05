import Sheet from "./Sheet"; // eslint-disable-line

interface GroupParams extends GenericInvolverComponent {
    title?: string; // Título del grupo de componentes.
}

/** 
 *  ## Grupo de datos
 *  Este componente renderiza un contenedor de grupo de componentes UI que se
 *  ordenan dentro de un componente {@link Sheet} y, anidado dentro de sí mismo
 *  crea una vista de grid para ordenar datos en una cuadrícula subdidida.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `title`: Título del grupo de componentes.
 */ 
const Group: (config: GroupParams) => (React.JSX.Element) = ({
    title,
    children,
}) => {

    return (
        <div className="group ui-layout-w-1-group group-[.ui-layout-w-1-group]:grid group-[.ui-layout-w-1-group]:pb-0 flex flex-col gap-2 group-[.ui-layout-w-1-group]:grid-cols-2 pb-2 last:pb-0">
            {title &&
                <p className="group-[:has(.ui-layout-w-2-group)]:hidden self-center opacity-50 font-semibold text-xs uppercase select-none">{title}</p>
            }
            {children}
        </div>
    );
};

export default Group;
