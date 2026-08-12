import { createContext } from "react";
import userTemplate from "../../constants/api/userTemplate";

const UserDataContext = createContext<IACele.Context.UserData>({
    'userData': userTemplate,
    'setUserData': () => null,
    'removeUserData': () => null,
});

export default UserDataContext;
