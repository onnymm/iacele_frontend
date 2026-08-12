import type FieldComponent from "@/views/FieldComponent";
import { useCallback, useRef } from "react";

const useFieldConfig = <M extends IACele.Data.ModelName>() => {

    // Inicialización de referencia de configuración de campos
    const fieldConfig = useRef<IACele.View.TreeFieldComponentProps<M, typeof FieldComponent>[]>([]);

    // Inicialización de función de suscripción de campos
    const suscribeFieldConfig = useCallback(
        (newConfig: IACele.View.TreeFieldComponentProps<M, typeof FieldComponent>) => {

            // Búsqueda de éste en los campos suscritos
            const found = fieldConfig.current.find( (suscribedConfig) => (suscribedConfig.name === newConfig.name) );
            // Si el campo no fue encontrado...
            if ( !found ) {
                // Se añade la configuración de éste
                fieldConfig.current.push(newConfig);
            };
        }, []
    );

    return { fieldConfig, suscribeFieldConfig };
};

export default useFieldConfig;
