import { createContext } from "react";

interface FormContextParams {
    canCreate: boolean;
    viewReadonly: boolean;
};

const IndividualRecordViewContext = createContext<FormContextParams>({
    canCreate: true,
    viewReadonly: false,
});

export default IndividualRecordViewContext;
