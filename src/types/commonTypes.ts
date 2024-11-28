export interface TextInvolverComponent {
    children: string;
}

export interface SingleJSXInvolverComponent {
    children: React.JSX.Element;
}

export interface GenericInvolverComponent {
    children: string | React.JSX.Element | Array<React.JSX.Element | string | boolean>
}

export type IconType = React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
} & React.RefAttributes<SVGSVGElement>>
