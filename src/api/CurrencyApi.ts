const apiKey = 'ebd35fb6a8e743ae95ed3ac2ec33e8d0';
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

export type RawRatesType = {
    [key: string]: number
}


export const fetchCurrencyData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.rates as RawRatesType;
    } catch (error) {
        throw new Error("Ошибка при получении данных с API");
    }
};

export async function getFavorite() : Promise<string[]> {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export async function addFavorite(favoriteCode: string) {
    const favorites = await getFavorite()

    localStorage.setItem('favorites', JSON.stringify([...favorites, favoriteCode]));
}

export async function removeFavorite(favoriteCode: string) {
    const favorites = await getFavorite()

    localStorage.setItem('favorites', JSON.stringify(favorites.filter(item => item !== favoriteCode)));
}
