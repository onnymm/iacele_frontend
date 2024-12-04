import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        authenticate?: boolean;
    }
}
