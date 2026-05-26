declare namespace IACele {

    declare namespace Common {

        interface SupportsChildren {
            children: React.ReactNode;
        };

    };

    declare namespace App {

        interface Authentication {
            'access_token': string;
            'token_type': 'bearer';
        };

        declare namespace Context {

            interface API {
                api: Resource.Client;
                appLoading: boolean;
            };

            interface UserToken {
                userToken: string | null;
                setUserToken: (value: string) => void;
                removeUserToken: () => void;
            };

        };

    };

    declare namespace Resource {

        interface Client {
            login: (
                username: string,
                password: string,
            ) => Promise<void>;
        };

        interface UserSession {
            setUserToken: (token: string) => void;
            setAppLoading: (loading: boolean) => void;
        };

    };

};
