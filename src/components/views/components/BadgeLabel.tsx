import { Badge } from "@/components/ui/badge";

interface BadgeLabelParams {
    decoration: IACele.UI.Variant;
    children: string | number;
};

const BadgeLabel = ({
    children,
    decoration,
}: BadgeLabelParams) => {

    return (
        <div className="flex flex-row items-end">
            <Badge className={`bg-${decoration} text-sm`}>
                {children}
            </Badge>
        </div>
    );
};

export default BadgeLabel;
