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

interface SelectableOption<T extends string | number | boolean> {
    key: T;
    displayName: string;
    [ keysToKeep?: string | number ]: number | string | boolean | object;
    [key?: string | number | boolean ]: string | number | boolean;
}

type GenericObject = { [key: string]: string | number | boolean };

type WidthsValues = {[key: string]: number | null}
