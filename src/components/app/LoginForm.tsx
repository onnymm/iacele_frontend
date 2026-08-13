import { useCallback, useEffect, useState } from "react";
import MiniForm from "../ui/layer/MiniForm"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Eye, EyeClosed, LockKeyhole, UserRound, type LucideProps } from 'lucide-react';
import Group from "../ui/layer/Group";
import { Button } from "../ui/button";
import useFocus from "@/hooks/ui/useFocus";
import useLogin from "@/hooks/app/useLogin";
import { Spinner } from "../ui/spinner";
import Alert from "../ui/Alerts/Alert";
import VOID_CALLBACK from "@/constants/app/callbacks";
import LABEL from "@/constants/app/label";

interface InputParams {
    id?: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    placeholder?: string;
    onValueChange?: (value: string) => (void);
    type?: React.HTMLInputTypeAttribute;
    isInvalid?: boolean;
    end?: React.ReactNode;
};

interface SubmitButtonParams extends IACele.Common.SupportsChildren {
    isDisabled?: boolean;
    isLoading?: boolean;
};

interface TogglePasswordVisibilityButtonParams {
    isPasswordVisible: boolean;
    togglePasswordVisibility: () => (void);
};

const LoginForm = () => {

    // Obtención de valores y funciones desde hook
    const { user, setUser, password, setPassword, login, authenticationError, loading, detail } = useLogin();
    // Inicialización de estados
    const [ isSubmitDisabled, setIsSubmitDisabled ] = useState<boolean>(true);
    const [ isPasswordVisible, setIsPasswordVisible ] = useState<boolean>(false);

    // Control de botón deshabilitado
    useEffect(
        () => {
            if ( user !== '' && password !== '' && !authenticationError ) {
                setIsSubmitDisabled(false);
            } else {
                setIsSubmitDisabled(true);
            };
        }, [user, password, authenticationError]
    );

    // Función para cambiar visibilidad de contraseña
    const togglePasswordVisibility = useCallback(
        () => {
            setIsPasswordVisible( (prevState) => (!prevState) );
        }, []
    );

    return (
        <MiniForm onSubmit={login}>
            <Group title="Ingresar">
                <Input
                    id="username"
                    icon={UserRound}
                    placeholder={LABEL.PLACEHOLDER.USER}
                    onValueChange={setUser}
                    isInvalid={authenticationError}
                />
                <Input
                    id="password"
                    icon={LockKeyhole}
                    placeholder={LABEL.PLACEHOLDER.PASSWORD}
                    onValueChange={setPassword}
                    type={isPasswordVisible ? "text" : "password"}
                    isInvalid={authenticationError}
                    end={<TogglePasswordVisibilityButton isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />}
                />
            </Group>
            <SubmitButton isDisabled={isSubmitDisabled} isLoading={loading}>
                {LABEL.BUTTON.LOGIN}
            </SubmitButton>
            <Alert detail={detail} />
        </MiniForm>
    );
};

export default LoginForm;

const TogglePasswordVisibilityButton = ({
    isPasswordVisible,
    togglePasswordVisibility,
}: TogglePasswordVisibilityButtonParams) => {

    return (
        <Button
            onMouseDown={(e) => {e.preventDefault()}}
            type="button"
            className="group/eye bg-transparent focus-visible:border-transparent focus-visible:ring-transparent cursor-pointer buttonn"
            variant="link"
            size="icon"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
        >
            {
                isPasswordVisible
                    ? <Eye className={`stroke-muted-foreground group-hover/eye:stroke-primary group-focus-visible:stroke-primary`} />
                    : <EyeClosed className={`stroke-muted-foreground group-hover/eye:stroke-primary group-focus-visible:stroke-primary`} />
            }
        </Button>
    )
};

const SubmitButton = ({
    isDisabled,
    isLoading,
    children,
}: SubmitButtonParams) => {

    return (
        <Button
            size="lg"
            className="cursor-pointer"
            disabled={isDisabled}
            type="submit"
        >
            {
                isLoading
                    ? <Spinner />
                    : children
            }
        </Button>
    );
};

const Input = ({
    icon: Icon,
    placeholder,
    onValueChange = VOID_CALLBACK.SYNC,
    type = undefined,
    isInvalid = false,
    end,
}: InputParams) => {

    // Uso de valores de enfoque
    const { isFocused, setFocusOn, setFocusOff } = useFocus();

    // Función para ejecución de cambios
    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            // Envío de nuevo valor
            onValueChange(event.target.value);
        }, [onValueChange]
    );

    return (
        <InputGroup className={`${isInvalid ? 'border-danger/50 text-danger' : 'border-muted-foreground/50'} border-2`}>
            <InputGroupInput
                placeholder={placeholder}
                onFocus={setFocusOn}
                onBlur={setFocusOff}
                onChange={onChange}
                type={type}
                spellCheck={false}
            />
            <InputGroupAddon>
                {Icon &&
                    <Icon className={isFocused ? 'stroke-primary' : 'stroke-muted-foreground'} />
                }
            </InputGroupAddon>
                {end &&
                    <InputGroupAddon align='inline-end'>{end}</InputGroupAddon>
                }
        </InputGroup>
    );
};
