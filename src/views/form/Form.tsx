import { Button } from "@/components/ui/button";
import useAPI from "@/hooks/app/useAPI";
import useDataView from "@/hooks/routes/useDataView";
import useAppHeaderControls from "@/hooks/ui/useAppHeaderControls";
import useGetModelNameFromView from "@/hooks/views/useGetModelNameFromView";
import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import { useCallback } from "react";
import FieldComponent from "../FieldComponent";
import InvisibleComponent from "./ui/InvisibleComponent";
import Field from "./field/Field";
import RecordEditionRender from "./RecordEditionRender";

const Form = <M extends IACeleV2.Data.ModelName>({
    children,
}: IACeleV2.View.FormStructure<M, typeof FieldComponent>) => {

    return (
        <RecordEditionRender>
            {children({ ...FormComponent })}
        </RecordEditionRender>
    );
};

export default Form;

const FormComponent = {

    Page: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        return (
            <div className="flex flex-col gap-2 p-2 w-full h-max min-h-full max-h-full">
                {children}
            </div>
        );
    },

    Header: <M extends IACeleV2.Data.ModelName>({
        children,
    }: IACeleV2.View.FormComponents<M, typeof FieldComponent>['Header']) => {

        // Obtención de función para renderizar los controles en el encabezado de la app
        const { renderHeaderControls } = useAppHeaderControls();

        return renderHeaderControls(children);
    },

    Action: <M extends IACeleV2.Data.ModelName>({
        name,
        label,
        decoration = 'default',
        invisible,
    }: IACeleV2.View.FormComponents<M, typeof FieldComponent>['Action']) => {

        // Obtención de instancia de API y estado de carga de la app
        const { api, appLoading } = useAPI();
        // Obtención del nombre del modelo de la vista
        const { modelName } = useGetModelNameFromView<M>();
        // Obtención de parámetros desde el formulario
        const { recordId, saveChanges: updateRecord, existingChanges, reload } = useRecordEditionParams<M>();

        // Función de ejecución de acción
        const executeAction = useCallback(
            async () => {
                // Si existen cambios a guardar
                if ( existingChanges ) {
                    // Se guardan primero los cambios
                    await updateRecord();
                };

                // Ejecución de la acción
                await api.actionV2({
                    'model_name': modelName,
                    'name': name,
                    'record_id': recordId,
                });
                // Se vuelve a cargar el registro
                reload();
            }, [api, existingChanges, modelName, name, recordId, reload, updateRecord]
        );

        return (
            <InvisibleComponent invisible={invisible}>
                <Button
                    onClick={executeAction}
                    className="cursor-pointer"
                    disabled={appLoading}
                    variant={decoration}
                >
                    {label}
                </Button>
            </InvisibleComponent>
        );
    },

    Sheet: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención de tipo de renderización
        const { display } = useDataView();

        return (
            <div className={`${display === 'screen' ? 'h-min': ''} group bg-card shadow-md pt-2 pb-4 border border-gray-500/20 rounded-lg w-full`}>
                <div className="grid grid-cols-1 md:grid-cols-2 h-min">
                    {children}
                </div>
            </div>
        );
    },

    Group: <M extends IACeleV2.Data.ModelName>({
        label,
        children,
        invisible,
    }: IACeleV2.View.FormComponents<M, typeof FieldComponent>['Group']) => {

        return (
            <InvisibleComponent invisible={invisible}>
                <div className="flex flex-col px-4 group-[.ui-group]:px-0 py-2 group-[.ui-group]:pb-0">
                    <p className="group-[.ui-group]:hidden opacity-50 pb-1 border-gray-500/50 border-b h-5 font-semibold text-xs uppercase select-none">
                        {label}
                    </p>
                    <div className="group ui-group flex flex-col gap-x-4 group-[.ui-group]:grid group-[.ui-group]:grid-cols-2 py-1">
                        {children}
                    </div>
                </div>
            </InvisibleComponent>
        );
    },

    Field: Field,

};
