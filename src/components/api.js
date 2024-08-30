// api.js
const apiKey = 'ebd35fb6a8e743ae95ed3ac2ec33e8d0';
const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

export const fetchCurrencyData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Ошибка при получении данных с API");
  }
};
