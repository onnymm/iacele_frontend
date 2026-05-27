class UserSession {
    setUserToken: (token: string) => void;
    removeUserToken: () => void;
    setAppLoading: (loading: boolean) => void;
    setUserData: (data: IACele.App.Me) => void;
    removeUserData: () => void;

    constructor (
        setUserToken: (token: string) => void,
        removeUserToken: () => void,
        setAppLoading: (loading: boolean) => void,
        setUserData: (data: IACele.App.Me) => void,
        removeUserData: () => void,
    ) {

        // Se establecen los valores
        this.setUserToken = setUserToken;
        this.removeUserToken = removeUserToken;
        this.setAppLoading = setAppLoading;
        this.setUserData = setUserData;
        this.removeUserData = removeUserData;
    };
};

export default UserSession;
