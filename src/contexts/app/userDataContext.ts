import { createContext } from "react";
import userTemplate from "../../constants/api/userTemplate";

const UserDataContext = createContext<IACeleV2.Context.UserData>({
    'userData': userTemplate,
    'setUserData': () => null,
    'removeUserData': () => null,
});

export default UserDataContext;
