import VOID_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface SaveChangesContextParams {
    saveChanges: () => Promise<void>;
};

const SaveChangesContext = createContext<SaveChangesContextParams>({
    saveChanges: VOID_CALLBACK.ASYNC,
});

export default SaveChangesContext;
