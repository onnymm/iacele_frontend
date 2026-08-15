import { Button } from "@/components/ui/button";
import useAPI from "@/hooks/app/useAPI";
import useDataView from "@/hooks/routes/useDataView";
import useAppHeaderControls from "@/hooks/ui/useAppHeaderControls";
import useGetModelNameFromView from "@/hooks/views/useGetModelNameFromView";
import useRecordEditionParams from "@/hooks/views/useRecordEditionParams";
import { useCallback, useMemo, useState } from "react";
import FieldComponent from "../FieldComponent";
import InvisibleComponent from "./ui/InvisibleComponent";
import Field from "./field/Field";
import RecordEditionRender from "./RecordEditionRender";
import ViewDataContext from "@/contexts/routes/viewDataContext";
import ModelDataProvider from "@/providers/views/ModelDataProvider";
import ViewMode from "../ViewMode";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContextDataContext from "@/contexts/views/contextDataContext";
import { Spinner } from "@/components/ui/spinner";
import FormExternalButtonsContext from "@/contexts/views/formExternalButtonsContext";
import VOID_CALLBACK from "@/constants/app/callbacks";
import LABEL from "@/constants/app/label";
import IconOption from "../IconOption";
import IndividualRecordViewContext from "@/contexts/views/individualRecordViewContext";

const Form = <M extends IACele.Data.ModelName>({
    children,
    create = true,
    readonly = false,
}: IACele.View.FormStructure<M, typeof FieldComponent, keyof typeof IconOption>) => {

    return (
        <IndividualRecordViewContext.Provider value={{ canCreate: create, viewReadonly: readonly }}>
            <RecordEditionRender>
                {children({ ...FormComponent })}
            </RecordEditionRender>
        </IndividualRecordViewContext.Provider>
    );
};

export default Form;

const FormComponent = {

    Page: ({
        children,
    }: IACele.Common.SupportsChildren) => {

        // Obtención del tipo de visualización del formulario
        const { display } = useDataView();

        return (
            <div className={`${display === 'screen' ? 'p-2' : ''} flex flex-col gap-2 w-full min-h-full`}>
                {children}
            </div>
        );
    },

    Header: <M extends IACele.Data.ModelName>({
        children,
    }: IACele.View.FormComponents<M, keyof typeof IconOption>['Header']) => {

        // Obtención de función para renderizar los controles en el encabezado de la app
        const { renderHeaderControls } = useAppHeaderControls();

        return renderHeaderControls(
            <div className="mt-2">
                {children}
            </div>
        );
    },

    Action: <M extends IACele.Data.ModelName>({
        name,
        label,
        invisible,
        decoration = 'default',
    }: IACele.View.FormComponents<M, keyof typeof IconOption>['Action']) => {

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
                await api.action({
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

    Wizard: <M extends IACele.Data.ModelName>({
        view,
        label,
        contextData,
        decoration,
    }: IACele.View.FormComponents<M, keyof typeof IconOption>['Wizard']) => {

        // Obtención de parámetros desde el contexto de formulario
        const { recordInView, reload } = useRecordEditionParams<M>();
        // Obtención de estado de carga de la aplicación
        const { appLoading } = useAPI();

        // Construcción de objeto de contexto para establecer valores iniciales en el registro
        const contextDataForRecord = useMemo<Partial<IACele.Data.RecordForView<IACele.Data.ModelName>>>(
            () => (
                contextData === undefined
                    ? {}
                    : contextData(recordInView)
            ), [contextData, recordInView]
        );

        // Inicialización de estado de función para ejecutar en el botón de aceptar
        const [ executeAccept, setExecuteAccept ] = useState<(() => (Promise<number | true>)) | null>(null);

        // Inicialización de estado de modal abierto
        const [ isOpen, setIsOpen ] = useState<boolean>(false);

        // Función de ejecución tras creación del registro
        const onCreate = useCallback(
            () => {
                // Se cierra el modal
                setIsOpen(false);
                // Se recargan los datos
                reload();
            }, [reload]
        );

        return (
            <ViewDataContext.Provider value={{
                viewDataName: view,
                recordId: 0,
                display: 'window',
                onCreate,
                onUpdate: VOID_CALLBACK.SYNC,
            }}>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer" variant={decoration}>{label}</Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(85%)]" aria-describedby={undefined}>
                        <DialogTitle>{label}</DialogTitle>

                        <FormExternalButtonsContext.Provider value={{ setSaveChanges: setExecuteAccept }}>
                            <ContextDataContext.Provider value={{ contextData: contextDataForRecord as any }}>
                                <ModelDataProvider>
                                    <ViewMode />
                                </ModelDataProvider>
                            </ContextDataContext.Provider>
                        </FormExternalButtonsContext.Provider>

                        <DialogFooter>
                            {executeAccept !== null &&
                                <Button variant='success' onClick={executeAccept} className="w-48">
                                    {
                                        appLoading
                                            ? <Spinner />
                                            : LABEL.ACTION.ACCEPT
                                    }
                                </Button>
                            }
                        </DialogFooter>

                    </DialogContent>
                </Dialog>
            </ViewDataContext.Provider>
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

    Group: <M extends IACele.Data.ModelName>({
        label,
        children,
        invisible,
    }: IACele.View.FormComponents<M, keyof typeof IconOption>['Group']) => {

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

    Icon: <M extends IACele.Data.ModelName>({
        decoration,
        invisible,
        icon,
    }: IACele.View.FormComponents<M, keyof typeof IconOption>['Icon']) => {

        // Obtención de la instancia de evaluador
        const { evaluator } = useRecordEditionParams<M>();

        // Evaluación de color de decoración
        const decorationColor = useMemo(
            () => {
                // Inicialización de un color predeterminado
                let color: IACele.UI.Variant = 'default';

                // Si existen valor de decoración provisto...
                if ( decoration ) {
                    // Validación de color por orden prioritario, se sobreescriben si más de uno es verdadero
                    if ( decoration.info && evaluator.evaluate(decoration.info) ) {
                        color = 'info';
                    };
                    if ( decoration.primary && evaluator.evaluate(decoration.primary) ) {
                        color = 'primary';
                    };
                    if ( decoration.success && evaluator.evaluate(decoration.success) ) {
                        color = 'success';
                    };
                    if ( decoration.warning && evaluator.evaluate(decoration.warning) ) {
                        color = 'warning';
                    };
                    if ( decoration.danger && evaluator.evaluate(decoration.danger) ) {
                        color = 'danger';
                    };
                };

                return color;
            }, [decoration, evaluator]
        );

        const Icon = useMemo(
            () => (IconOption[icon]), [icon]
        );

        return (
            <InvisibleComponent invisible={invisible}>
                <Icon className={`stroke-${decorationColor} size-6`} />
            </InvisibleComponent>
        );
    },

};
