import EMPTY_CALLBACK from "@/constants/app/callbacks";
import { createContext } from "react";

interface FormExternalButtonsContextParams {
    setSaveChanges: React.Dispatch<React.SetStateAction<(() => (Promise<number | true>)) | null>>;
};

const FormExternalButtonsContext = createContext<FormExternalButtonsContextParams>({
    setSaveChanges: EMPTY_CALLBACK.ASYNC,
});

export default FormExternalButtonsContext;
