export type GenericEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FocusEvent | React.KeyboardEvent;

export enum StyleCategory {
    Primary = 'primary',
    Secondary = 'secondary',
    Danger = 'danger',
    Success = 'success',
}

export type StyleCategoryOptions = typeof StyleCategory[keyof typeof StyleCategory]

export enum StatusCategory {
    Success = 'success',
    Warning = 'warning',
    Error = 'danger',
}

export type StatusCategoryOptions = typeof StatusCategory[keyof typeof StatusCategory]

export enum InputType {
    Text = "text",
    Search = "search",
    Number = "number",
    Password = "password",
}

export type InputTypeOptions = typeof InputType[keyof typeof InputType]

export enum InputAutoCapitalize {
    Characters = "characters",
    None = "none",
    Off = "off",
    On = "on",
    Sentences = "sentences",
    Words = "words"
}

export type AutoCapitalizeOptions = typeof InputAutoCapitalize[keyof typeof InputAutoCapitalize]
