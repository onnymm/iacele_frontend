import EMPTY_CALLBACK from "@/constants/app/callbacks";
import ViewDataContext from "@/contexts/routes/viewDataContext"
import useUserData from "@/hooks/app/useUserData";
import ModelDataProvider from "@/providers/views/ModelDataProvider";
import ViewMode from "@/views/ViewMode";

const Me = () => {

    // Obtención de los datos de usuario
    const { userData } = useUserData();

    return (
        <ViewDataContext.Provider value={{
            display: 'screen',
            recordId: userData['id'],
            viewDataName: 'base.users.me.form',
            onCreate: EMPTY_CALLBACK.SYNC,
            onUpdate: EMPTY_CALLBACK.SYNC,
        }}>
            <ModelDataProvider>
                <ViewMode />
            </ModelDataProvider>
        </ViewDataContext.Provider>
    );
};

export default Me;
