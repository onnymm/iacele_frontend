interface TextLabelParams {
    decoration: IACele.UI.Variant;
    children: string | number;
};

const TextLabel = ({
    children,
    decoration,
}: TextLabelParams) => {

    return (
        <span className={`text-${decoration} flex flex-row items-center text-sm`}>
            {children}
        </span>
    );
};

export default TextLabel;
