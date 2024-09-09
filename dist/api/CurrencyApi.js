var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = 'ebd35fb6a8e743ae95ed3ac2ec33e8d0';
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
export const fetchCurrencyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        return data.rates;
    }
    catch (error) {
        throw new Error("Ошибка при получении данных с API");
    }
});
export function getFavorite() {
    return __awaiter(this, void 0, void 0, function* () {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
}
export function addFavorite(favoriteCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const favorites = yield getFavorite();
        localStorage.setItem('favorites', JSON.stringify([...favorites, favoriteCode]));
    });
}
export function removeFavorite(favoriteCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const favorites = yield getFavorite();
        localStorage.setItem('favorites', JSON.stringify(favorites.filter(item => item !== favoriteCode)));
    });
}
