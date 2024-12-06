import { useContext, useState } from "react";
import CompactPage from "../components/layout/CompactPage"
import Group from "../components/layout/Group";
import { TokenContext } from "../contexts/tokenContext";
import userLogin from "../security/userLogin";
import InputUser from "../components/ui/input/InputUser";
import InputPassword from "../components/ui/input/InputPassword";
import ButtonText from "../components/ui/button/ButtonText";
import MiniGrapper from "../components/layout/MiniGrapper";
import Alert from "../components/ui/alert/Alert";
import ToggleDarkMode from "../components/ui/toggle/ToggleDarkMode";

const Login: () => (React.JSX.Element) = () => {

    const { setToken } = useContext(TokenContext)
    const [ inputUser, setInputUser ] = useState<string>("");
    const [ inputPassword, setInputPassword ] = useState<string>("");
    const [ loginMessage, setLoginMessage ] = useState<string>("");
    const [ success, setSuccess ] = useState<boolean>(false);

    const login: () => (Promise<void>) = async () => {

        if ( inputUser && inputPassword ) {
            const loginResponse = await userLogin(
                inputUser,
                inputPassword,
                setToken,
            )

            if ( !loginResponse ) {
                setLoginMessage("Usuario o contraseña inválidos")
                setSuccess(false);
            }
        }
    }

    return (
        <CompactPage>
            <MiniGrapper>

                <Group title="Ingresa tus datos">
                    <InputUser value={inputUser} setValue={setInputUser} visiblePlaceholder="Nombre de usuario" onEnter={login} />
                    <InputPassword value={inputPassword} setValue={setInputPassword} visiblePlaceholder="Contraseña" onEnter={login} />
                    <ButtonText type='primary' disabled={inputUser === "" || inputPassword === ""} onClick={login}>Iniciar sesión</ButtonText>

                    {/* Indicador de credenciales de usuario inválidas */}
                    {loginMessage !== "" && !success &&
                        <Alert type={'error'} title="Error al iniciar sesión">
                            Usuario o contraseña inválidos.
                        </Alert>
                    }

                    {loginMessage !== ""}
                </Group>

                <Group>
                    <p>¿No tienes cuenta? <a href="#">Regístrate</a></p>
                    <div className="flex justify-end">
                        <ToggleDarkMode />
                    </div>
                </Group>

            </MiniGrapper>
        </CompactPage>
    )
}

export default Login;
