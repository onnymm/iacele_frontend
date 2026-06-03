interface MiniWrapperParams extends IACele.Common.SupportsChildren {
    onSubmit?: (e: React.SubmitEvent) => void;
};

const MiniForm: React.FC<MiniWrapperParams> = ({
    children,
    onSubmit,
}) => {

    return (
        <form
            className="flex flex-col gap-2 bg-gray-500/10 m-2 p-4 border border-gray-500/50 rounded-2xl sm:w-[320px]"
            onSubmit={onSubmit}
        >
            {children}
        </form>
    );
};

export default MiniForm;
