import { makeAutoObservable, runInAction } from "mobx";
import { fetchCurrencyData, getFavorite, addFavorite, removeFavorite, RawRatesType } from "../api/CurrencyApi";
import { initialItems } from "../components/initialItems";

export type ItemType = {
    text: string;
    symbol: string;
    code: string;
    currencyCode: string;
    rate: number;
    isFavorite: boolean;
};

export class CurrencyStore {
    rates: RawRatesType | null = null;
    favorite: string[] = [];
    loading: boolean = true;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.initializeData();
    }

    initializeData = async () => {
        this.getFavoriteData();
        this.fetchCurrencyData();
    }

    fetchCurrencyData = async () => {
        try {
            const currencyData = await fetchCurrencyData();
            runInAction(() => {
                this.rates = currencyData;
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => {
                this.error = "Ошибка загрузки данных";
                this.loading = false;
            });
        }
    }

    getFavoriteData = async () => {
        const newFavorite = await getFavorite();
        runInAction(() => {
            this.favorite = newFavorite;
        });
    }

    addToFavorite = async (favoriteCode: string) => {
        await addFavorite(favoriteCode);
        this.getFavoriteData();
    }

    removeFromFavorite = async (favoriteCode: string) => {
        await removeFavorite(favoriteCode);
        this.getFavoriteData();
    }

    toggleFavorite = (code: string) => {
        const handler = this.favorite.includes(code) ? this.removeFromFavorite : this.addToFavorite;
        handler(code);
    }

    get items(): ItemType[] {
        if (this.rates) {
            return initialItems
                .map((item) => ({
                    ...item,
                    isFavorite: this.favorite.includes(item.code),
                    rate: this.rates![item.code] || 0,
                }))
                .sort((a, b) => {
                    if (a.isFavorite === b.isFavorite) {
                        return 0;
                    }
                    return a.isFavorite ? -1 : 1;
                });
        }

        return [];
    }
}

export const currencyStore = new CurrencyStore();
