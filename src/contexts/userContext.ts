import { createContext } from "react";
import { CurrentUserData } from "../types/currentUserData";
import userTemplate from "../constants/userTemplate";

export const UserContext = createContext<CurrentUserData>(userTemplate)