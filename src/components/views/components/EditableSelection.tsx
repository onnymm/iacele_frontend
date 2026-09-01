import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface EditableSelectionParams <M extends IACele.Data.ModelName>{
    value: string;
    setValue: (inputValue: string | null) => void;
    deleteValue: () => void;
    fieldMetadata: IACele.Data.FieldsMetadata<M>[IACele.Data.FieldName<M>];
    decorationColor: IACele.UI.Variant;
};

const EditableSelection = <M extends IACele.Data.ModelName>({
    value,
    setValue,
    deleteValue,
    fieldMetadata,
    decorationColor,
}: EditableSelectionParams<M>) => {

    return (
        <div className="flex flex-row gap-2">
            <Select onValueChange={setValue} value={value}>
                <SelectTrigger className={`w-full text-${decorationColor}`}>
                    <SelectValue className="bg-green-500" placeholder="Selecciona un valor" />
                </SelectTrigger>
                <SelectContent>
                    {
                        fieldMetadata['selection_ids'].map(
                            ( selection ) => (
                                <SelectItem
                                    key={selection.id}
                                    value={selection.name}
                                >
                                    {selection.label}
                                </SelectItem>
                            )
                        )
                    }
                </SelectContent>
            </Select>
            <Button size='icon' variant='secondary' onClick={deleteValue}>
                <X className="stroke-foreground" />
            </Button>
        </div>
    );
};

export default EditableSelection;
