type GenericEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FocusEvent | React.KeyboardEvent;

interface BaseImageComponent {
    data: string;
    alt?: string;
}
