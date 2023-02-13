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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeNotAuthenticated = exports.MustBeAuthenticated = void 0;
const use_auth_1 = require("./use-auth");
const react_1 = __importStar(require("react"));
const MustBeAuthenticated = (Component, options) => {
    return function MustBeAuthenticated(props) {
        const { isLoading, user, onRedirectCallback, loginPath, Loader } = (0, use_auth_1.useAuth)();
        (0, react_1.useEffect)(() => {
            if (isLoading) {
                return;
            }
            if (!user && !(options === null || options === void 0 ? void 0 : options.skipRedirect)) {
                onRedirectCallback(loginPath);
            }
        }, [isLoading, user]);
        if (isLoading) {
            return react_1.default.createElement(Loader, null);
        }
        return user ? react_1.default.createElement(Component, Object.assign({}, props)) : react_1.default.createElement(Loader, null);
    };
};
exports.MustBeAuthenticated = MustBeAuthenticated;
const MustBeNotAuthenticated = (Component, options) => {
    return function MustBeNotAuthenticated(props) {
        const { isLoading, user, onRedirectCallback, Loader, profilePath } = (0, use_auth_1.useAuth)();
        (0, react_1.useEffect)(() => {
            if (isLoading) {
                return;
            }
            if (user && !(options === null || options === void 0 ? void 0 : options.skipRedirect)) {
                onRedirectCallback(profilePath);
            }
        }, [isLoading, user]);
        if (isLoading) {
            return react_1.default.createElement(Loader, null);
        }
        return user ? react_1.default.createElement(Loader, null) : react_1.default.createElement(Component, Object.assign({}, props));
    };
};
exports.MustBeNotAuthenticated = MustBeNotAuthenticated;
