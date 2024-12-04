import { IconType } from "../types/commonTypes";

export interface MenuRoute {
    name: string;
    route: string;
};

export interface MenuGroup {
    name: string;
    icon: IconType;
    routes?: string | MenuRoute[];
};

export interface MenuSection {
    name: string;
    groups: MenuGroup[];
}
