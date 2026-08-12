import { useCallback, useEffect, useState } from "react";
import { Alert as ShadcnAlert } from "../alert";
import { X } from "lucide-react";

const Alert: React.FC<IACele.UI.Alert.Component> = ({
    detail,
    onClose = () => null,
    canClose = false,
}) => {

    const [ display, setDisplay ] = useState<boolean>(true);

    useEffect(
        () => {
            if ( detail.display ) {
                setDisplay(true);
            };
        }, [detail.display]
    );

    const onClick = useCallback(
        () => {
            setDisplay(false);
            onClose();
        }, [onClose]
    );

    if ( detail.display && display ) {
        const Icon = detail.icon;
        return (
            <ShadcnAlert className="flex justify-center" variant={detail.variant}>
                <div className="flex flex-row items-center gap-4">
                    <Icon className="size-5" />
                    {detail.message}
                </div>
                {canClose &&
                    <button className="top-0 right-0 absolute p-1 pr-2 cursor-pointer" onClick={onClick}>
                        <X className="size-4" />
                    </button>
                }
            </ShadcnAlert>
        );
    };
};

export default Alert;
