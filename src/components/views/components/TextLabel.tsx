interface TextLabelParams {
    decoration: IACele.UI.Variant;
    children: string | number;
};

const TextLabel = ({
    children,
    decoration,
}: TextLabelParams) => {

    return (
        <span className={`text-${decoration} group-[.iacele-item]:h-6 h-8 flex flex-row items-center text-sm`}>
            {children}
        </span>
    );
};

export default TextLabel;
