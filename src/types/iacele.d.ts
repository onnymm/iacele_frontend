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

            interface UserData {
                userData: Me;
                setUserData: React.Dispatch<React.SetStateAction<Me>>
                removeUserData: () => void;
            };

        };

        interface Me {
            'id': number;
            'name': string;
            'active': boolean;
            'login': string;
            'profile_picture': string | null;
            'role_ids': {
                'id': number;
                'name': string;
                'label': string;
                'group_ids': {
                    'id': number;
                    'name': string;
                    'label': string;
                }[];
            }[];
        };

    };

    declare namespace Resource {

        interface Client {
            login: (
                username: string,
                password: string,
            ) => Promise<void>;

            me: () => Promise<void>;
        };

        interface UserSession {
            setUserToken: (token: string) => void;
            removeUserToken: () => void;
            setAppLoading: (loading: boolean) => void;
            setUserData: (data: IACele.App.Me) => void;
            removeUserData: () => void;
        };

    };

};
