interface AvatarParams extends BaseImageComponent {
    online: boolean;
}

interface MenuRoute {
    name: string;
    route: string;
};

interface MenuGroup {
    name: string;
    icon: IconType;
    routes?: string | MenuRoute[];
};

interface MenuSection {
    name: string;
    groups: MenuGroup[];
}

interface OptionObject {
    key: string | number | boolean;
    active: boolean;
    displayName: string;
    [ keysToKeep: string | number ]: number | string | boolean | object;
}

interface SelectableOption {
    key: string | number | boolean;
    displayName: string;
    [ keysToKeep: string | number ]: number | string | boolean | object;
}
