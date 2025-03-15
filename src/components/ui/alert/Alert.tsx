import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface AlertTemplateParams extends TextInvolverComponent {
    title?: string; // Título a renderizar.
    type: StatusStyle; // Tipo de alerta a mostrar.
    closeable?: boolean; // Indicdor de si la alerta puede cerrarse o se mantendrá siempre visible. El valor por defecto es `false`.
}

/** 
 *  ## Notificación de alerta
 *  Este componente renderiza un contenedor que muestra una alerta.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `title`: Título a renderizar.
 *  - [ {@link StatusCategoryOptions} ] `type`: Tipo de alerta a mostrar. Las
 *  opciones disponibles son:
 *      - {@link StatusCategory.Success}: Notificación de acción exitosa.
 *      - {@link StatusCategory.Warning}: Notificación de advertencia.
 *      - {@link StatusCategory.Error}: Notificación de error.
 *  - [ `boolean` ] `closeable`: Indicdor de si la alerta puede cerrarse o se
 *  mantendrá siempre visible. El valor por defecto es `false`.
 */ 
const Alert: (config: AlertTemplateParams) => (React.JSX.Element) = ({
    children,
    title,
    type,
    // closeable = false,
}) => {

    // Clases para estilización del componente
    const iconBgClassName = {
        success: "bg-green-400 dark:bg-green-400",
        warning: "bg-yellow-400 dark:bg-yellow-400",
        error: "bg-red-400 dark:bg-red-400",
    };
    const wraperBgClassName = {
        success: "bg-green-400/10 dark:bg-green-400/10",
        warning: "bg-yellow-400/10 dark:bg-yellow-400/10",
        error: "bg-red-400/10 dark:bg-red-400/10",
    };
    const colorClassName = {
        success: "text-green-400",
        warning: "text-yellow-400",
        error: "text-red-400",
    };
    const borderClassName = {
        success: "border-green-500/50",
        warning: "border-yellow-500/50",
        error: "border-red-500/50",
    };
    const statusIcon: {[key: string]: IconType} = {
        success: CheckIcon,
        warning: ExclamationTriangleIcon,
        error: XMarkIcon,
    };

    // Definición de ícono a renderizar en base al tipo de alerta.
    const IconToRender = statusIcon[type];

    return (
        <div className={`${borderClassName[type]} ${wraperBgClassName[type]} w-full border rounded-xl align-top flex flex-row gap-2 p-2`}>
            <div className={`${iconBgClassName[type]} p-1 rounded-lg flex flex-col size-6`}>
                <IconToRender className="fill-white size-4" />
            </div>
            <div className={`${colorClassName[type]} pt-[2px] w-full flex flex-col`}>
                {title && 
                    <p className="mt-[-2px] font-bold">{title}</p>
                }
                <p className="w-full font-light text-current text-sm break-words whitespace-normal">{children}</p>
            </div>
        </div>
    );
};

export default Alert;
