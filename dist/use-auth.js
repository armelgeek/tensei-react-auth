"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenseiAuthProvider = exports.useTensei = exports.useAuth = exports.TenseiAuthContext = void 0;
const sdk_1 = require("@tensei/sdk");
const react_1 = __importStar(require("react"));
const defaultOnRedirectCallback = (path) => {
    window.location.href = path;
};
const DefaultLoader = () => react_1.default.createElement(react_1.default.Fragment, null);
exports.TenseiAuthContext = (0, react_1.createContext)({
    isLoading: true,
    loginPath: '/auth/login',
    profilePath: '/dashboard',
    tensei: {},
    user: undefined,
    setAuth: () => { },
    onRedirectCallback: defaultOnRedirectCallback,
    Loader: DefaultLoader,
});
const useAuth = () => (0, react_1.useContext)(exports.TenseiAuthContext);
exports.useAuth = useAuth;
const useTensei = () => (0, exports.useAuth)().tensei;
exports.useTensei = useTensei;
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
const TenseiAuthProvider = ({ options, children, Loader = DefaultLoader, tensei: tenseiInstance, loginPath = '/auth/login', profilePath = '/dashboard', onRedirectCallback = defaultOnRedirectCallback, }) => {
    const [user, setUser] = (0, react_1.useState)({
        isLoading: true,
        user: null,
        accessToken: undefined,
    });
    const [tensei] = (0, react_1.useState)(tenseiInstance ? tenseiInstance : (0, sdk_1.sdk)(options));
    const subscribeToAuthChanges = () => {
        tensei.auth().listen((auth) => {
            setUser({
                isLoading: false,
                user: (auth === null || auth === void 0 ? void 0 : auth.user) || null,
                accessToken: auth === null || auth === void 0 ? void 0 : auth.accessToken,
            });
        });
    };
    const loadExistingSession = () => __awaiter(void 0, void 0, void 0, function* () {
        yield tensei.auth().loadExistingSession();
    });
    // @ts-ignore
    const setAuth = (response) => {
        setUser({
            isLoading: false,
            user: (response === null || response === void 0 ? void 0 : response.user) || null,
            accessToken: response === null || response === void 0 ? void 0 : response.accessToken,
        });
    };
    const loadSocialAuth = () => {
        tensei
            .auth()
            .socialConfirm()
            .then(() => {
            onRedirectCallback(profilePath);
        })
            .catch(() => {
            onRedirectCallback(loginPath);
        });
    };
    const init = () => __awaiter(void 0, void 0, void 0, function* () {
        subscribeToAuthChanges();
        // If there's an access token, then we might need to handle social authentication
        if (getUrlParameter('accessToken') && getUrlParameter('provider')) {
            return loadSocialAuth();
        }
        yield loadExistingSession();
    });
    (0, react_1.useEffect)(() => {
        init();
    }, []);
    return (react_1.default.createElement(exports.TenseiAuthContext.Provider, { value: {
            tensei,
            Loader,
            setAuth,
            loginPath,
            profilePath,
            user: user.user,
            onRedirectCallback,
            isLoading: user.isLoading,
            accessToken: user.accessToken,
        } }, children));
};
exports.TenseiAuthProvider = TenseiAuthProvider;
