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

                    <Badge key={recordId} className={`${recordId > 0 ? `bg-${decorationColor}` : 'bg-default'} group/iacele-badge text-sm h-8 rounded-full max-w-40 md:h-5`}>
                        <span className="overflow-hidden text-ellipsis text-nowrap">
                            {displayName}
                        </span>
                        {!isReadonly &&
                            <>
                                <EditRelatedRecord recordId={recordId} relatedRecordsManager={relatedRecordsManager} view={view} />
                                <Button size='icon' className="hidden group-hover/iacele-badge:block size-4 cursor-pointer" onClick={removeItem}>
                                    <X className="size-3" />
                                </Button>
                            </>
                        }
                    </Badge>

            </TooltipTrigger>
            <TooltipContent className="flex flex-row justify-between bg-background/10 backdrop-blur-xs">
                {displayName}
            </TooltipContent>
        </Tooltip>
    );
};

export default BadgeTag;
