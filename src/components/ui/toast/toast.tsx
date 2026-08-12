import { toast } from "sonner";
import { Button } from "../button";
import { X, type LucideProps } from "lucide-react";

interface ToastProps {
    title?: string;
    content: string;
    type?: IACele.UI.Variant | 'default';
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};

const borderColor: Record<IACele.UI.Variant | 'default', string> = {
    'default': 'border-gray-500/50',
    'info': 'border-info',
    'primary': 'border-primary',
    'success': 'border-success',
    'warning': 'border-warning',
    'danger': 'border-danger',
};

const backgroundColor: Record<IACele.UI.Variant | 'default', string> = {
    'default': 'bg-card/50',
    'info': 'bg-info/50',
    'primary': 'bg-primary/50',
    'success': 'bg-success/50',
    'warning': 'bg-warning/50',
    'danger': 'bg-danger/50',
};

const showToast = ({
    title,
    content,
    type = 'default',
    icon: Icon,
}: ToastProps) => {

    toast.custom(
        (id) => (
            <div className={`${backgroundColor[type]} ${borderColor[type]} mr-4 md:min-w-80 backdrop-blur-xs md:mr-2 flex flex-row gap-4 items-center relative min-h-14 px-2 py-2 border-2 rounded-2xl`}>
                {Icon &&
                    <div className={`${backgroundColor[type]} ${type === 'default' ? 'brightness-75' : ''} p-3 rounded-full`}>
                        <Icon className="size-5" />
                    </div>
                }
                <div className="flex flex-col justify-center items-start gap-1">
                {title &&
                    <p className="font-bold text-sm">{title}</p>
                }
                <span className="text-sm">{content}</span>
                </div>
                <Button className={`${borderColor[type]} border-2 -top-4 md:-top-3 md:-right-3 -right-4 z-10 absolute rounded-full size-8 md:size-6`} size={"icon"} variant={type} onClick={() => toast.dismiss(id)}>
                    <X className="size-4" />
                </Button>
            </div>
        )
    );
};

export default showToast;
