import { createContext } from "react";
import userTemplate from "../../constants/api/userTemplate";

const UserDataContext = createContext<IACele.App.Context.UserData>({
    'userData': userTemplate,
    'setUserData': () => null,
    'removeUserData': () => null,
});

export default UserDataContext;
