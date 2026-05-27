import { useContext } from "react";
import UserDataContext from "./contexts/app/userDataContext";
import APIContext from "./contexts/app/apiContext";

const App = () => {

    const { userData } = useContext(UserDataContext);
    const { appLoading } = useContext(APIContext);

    return (
        <>
            <div>{userData.name}</div>
            <div>En estado de carga: {`${appLoading}`}</div>
            Iacele
        </>
    );
};

export default App;
