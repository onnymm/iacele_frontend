import { createContext } from "react";
import userTemplate from "../../constants/api/userTemplate";
import VOID_CALLBACK from "@/constants/app/callbacks";

const UserDataContext = createContext<IACele.Context.UserData>({
    userData: userTemplate,
    setUserData: VOID_CALLBACK.SYNC,
    removeUserData: VOID_CALLBACK.SYNC,
});

export default UserDataContext;
