interface GroupParams extends IACele.Common.SupportsChildren {
    title?: string;
};

const Group: React.FC<GroupParams> = ({
    children,
    title,
}) => {

    return (
        <div className="group flex flex-col gap-2 pb-2 last:pb-0">
            {/* Título del grupo */}
            {title &&
                <p className="self-center opacity-50 font-semibold text-sm uppercase select-none">{title}</p>
            }
            {/* Contenido del grupo */}
            {children}
        </div>
    );
};

export default Group;
