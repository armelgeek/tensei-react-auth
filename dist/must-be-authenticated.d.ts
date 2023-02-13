export interface Options {
    skipRedirect?: boolean;
}
export declare const MustBeAuthenticated: <P extends object>(Component: ComponentType, options?: Options) => FunctionComponent<P>;
export declare const MustBeNotAuthenticated: <P extends object>(Component: ComponentType, options?: Options) => FunctionComponent<P>;
