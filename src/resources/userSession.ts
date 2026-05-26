class UserSession {
    setUserToken: (token: string) => void;
    setAppLoading: (loading: boolean) => void;

    constructor (
        setUserToken: (token: string) => void,
        setAppLoading: (loading: boolean) => void,
    ) {

        // Se establecen los valores
        this.setUserToken = setUserToken;
        this.setAppLoading = setAppLoading;
    };
};

export default UserSession;
