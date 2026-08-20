import { createContext } from "react";

const CreateOrUpdateRecordContext = createContext<IACele.Context.ViewContext.CreateOrUpdateRecordCallback<any>>({
    createOrUpdate: async () => (true),
});

export default CreateOrUpdateRecordContext;
