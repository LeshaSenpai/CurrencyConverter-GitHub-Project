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
exports.CurrencyProvider = exports.CurrencyContext = void 0;
const react_1 = __importStar(require("react"));
const CurrencyApi_1 = require("../api/CurrencyApi");
const initialItems_1 = require("../components/initialItems");
exports.CurrencyContext = (0, react_1.createContext)(null);
const CurrencyProvider = ({ children }) => {
    const [rates, setRates] = (0, react_1.useState)(null);
    const [items, setItems] = (0, react_1.useState)([]);
    const [favorite, setFavorite] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const getFavoriteData = () => __awaiter(void 0, void 0, void 0, function* () {
        const newFavorite = yield (0, CurrencyApi_1.getFavorite)();
        setFavorite(newFavorite);
    });
    const addToFavorite = (favoriteCode) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, CurrencyApi_1.addFavorite)(favoriteCode);
        getFavoriteData();
    });
    const removeFromFavorite = (favoriteCode) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, CurrencyApi_1.removeFavorite)(favoriteCode);
        getFavoriteData();
    });
    (0, react_1.useEffect)(() => {
        if (!rates) {
            return;
        }
        const newItems = initialItems_1.initialItems
            .map((item) => (Object.assign(Object.assign({}, item), { isFavorite: favorite.includes(item.code), rate: rates[item.code] || 0 })))
            .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
        setItems(newItems);
    }, [rates, favorite]);
    (0, react_1.useEffect)(() => {
        getFavoriteData();
        const loadCurrencyData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currencyData = yield (0, CurrencyApi_1.fetchCurrencyData)();
                setRates(currencyData);
            }
            catch (err) {
                setError('Ошибка при загрузке данных');
            }
            finally {
                setLoading(false);
            }
        });
        loadCurrencyData();
    }, []);
    const toggleFavorite = (code) => {
        const handler = favorite.includes(code) ? removeFromFavorite : addToFavorite;
        handler(code);
    };
    return (<exports.CurrencyContext.Provider value={{
            rates,
            loading,
            error,
            items,
            toggleFavorite,
        }}>
      {children}
    </exports.CurrencyContext.Provider>);
};
export { CurrencyContext, CurrencyProvider };
