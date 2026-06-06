import { useContext } from "react";
import UserDataContext from "@/contexts/app/userDataContext";

const useUserData = () => {

    // Obtención de valor y funciones desde hook
    const { userData, setUserData, removeUserData } = useContext(UserDataContext);

    return { userData, setUserData, removeUserData };
};

export default useUserData;
