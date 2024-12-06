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
