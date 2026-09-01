import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type RelatedRecords from "@/core/relatedRecords";
import { useMemo } from "react";
import EditRelatedRecord from "./actions/EditRelatedRecord";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BadgeTagParams <M extends IACele.Data.ModelName>{
    decorationColor: IACele.UI.Variant;
    isReadonly: boolean;
    record: IACele.Data.RecordForView<M>;
    removeItem: () => (void);
    view: keyof IACele.View._Definition.ViewToModelName;
    relatedRecordsManager: RelatedRecords<M, IACele.Data.FieldName<M>>;
};

const BadgeTag = <M extends IACele.Data.ModelName>({
    decorationColor,
    isReadonly,
    record,
    removeItem,
    view,
    relatedRecordsManager,
}: BadgeTagParams<M>) => {

    // Obtención de la ID del registro
    const recordId = useMemo(
        () =>(record['id'] as number), [record]
    );
    // Obtención del nombre a mostrar
    const displayName = useMemo(
        () =>((
            record['display_name']
                ?? record['name']
                        ?? `nuevo (${recordId})`
        ) as string), [record, recordId]
    );

    return (
        <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>

                    <Badge key={recordId} className={`${recordId > 0 ? `bg-${decorationColor}` : 'bg-default'} group/iacele-badge flex justify-start flex-row text-sm h-8 w-max max-w-80 md:max-w-64 rounded-full md:h-5`}>
                        <div className="relative flex flex-row justify-start items-center gap-1 h-full max-h-full">

                            <span className="w-max md:group-hover/iacele-badge:w-[calc(100%-2.5rem)] md:w-full max-w-55 overflow-hidden text-ellipsis text-nowrap">
                                {displayName}
                            </span>
                            <div className="md:hidden right-0 md:absolute flex group-hover/iacele-badge:flex flex-row gap-1">
                                {!isReadonly &&
                                    <>
                                        <EditRelatedRecord recordId={recordId} relatedRecordsManager={relatedRecordsManager} view={view} />
                                        <Button size='icon' className="flex justify-center items-center size-6 md:size-4 cursor-pointer" onClick={removeItem}>
                                            <X className="size-[75%]" />
                                        </Button>
                                    </>
                                }
                            </div>
                        </div>
                    </Badge>

            </TooltipTrigger>
            <TooltipContent className="hidden md:flex flex-row justify-between bg-background/10 backdrop-blur-xs">
                {displayName}
            </TooltipContent>
        </Tooltip>
    );
};

export default BadgeTag;
