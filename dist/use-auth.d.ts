import { FunctionComponent, ComponentType } from 'react';
export interface TenseiAuthContextInterface {
    isLoading: boolean;
    accessToken?: string;
    tensei: import('@tensei/sdk').SdkContract;
    user: import('@tensei/sdk').AuthResponse['user'];
    setAuth: (response?: import('@tensei/sdk').AuthResponse) => void;
    onRedirectCallback: (path: string) => void;
    loginPath: string;
    profilePath: string;
    Loader: ComponentType;
}
export declare const TenseiAuthContext: any;
export declare const useAuth: () => any;
export declare const useTensei: () => TenseiAuthContextInterface['tensei'];
export interface TenseiAuthProviderProps {
    tensei?: TenseiAuthContextInterface['tensei'];
    options?: import('@tensei/sdk').SdkOptions;
    onRedirectCallback?: (path: string) => void;
    profilePath?: string;
    loginPath?: string;
    Loader?: ComponentType;
}
export declare const TenseiAuthProvider: FunctionComponent<TenseiAuthProviderProps>;
