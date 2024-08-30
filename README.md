# Currency Converter

This is a simple currency converter application built with React. The application allows users to view exchange rates for various currencies and mark certain currencies as favorites, which will be saved and persisted between sessions.

## Features

- **Currency Selection:** Users can select from a wide range of currencies to view their exchange rates against the US dollar.
- **Favorite Currencies:** Users can mark currencies as favorites, and these will be saved in `localStorage` to be persisted across sessions. Favorite currencies are always displayed at the top of the list.
- **Real-time Exchange Rates:** The application fetches real-time exchange rates data using a currency API.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/LeshaSenpai/CurrencyConverter-GitHub-Project.git
    ```
2. Navigate to the project directory:
    ```bash
    cd CurrencyConverter-GitHub-Project
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

### Running the Application

To start the development server, use the following command:

```bash
npm start
```
or with yarn:
```bash
or with yarn:
yarn start
```
## Usage
Once you launch the app, you can do the following:

**View currency rates**:
A converter with currencies will be displayed on the main page
**Currency selector**:
You can click on the drop-down list to select a specific currency. There is also a search function for easier navigation.
**Favorite currencies**:
Click on the star icon next to any currency to mark it as a favorite. Favorite currencies will be displayed at the top of the list in both the currency selector drop-down list and the rate table.
**Permanent favorites**:
Your favorite currencies are saved in localStorage, so even if you close the browser or reload the page, your favorite currencies will still be marked and sorted at the top.

## Customization and Development
### Adding New Currencies
To add new currencies to the application, update the initialItems array in the src/components/initialItems.js file with the necessary currency details (e.g., id, text, symbol, code, countyCode, isFavorite).

### Customizing the Appearance
Styles are located in the src/styles/ directory. You can modify existing CSS files or add new ones to customize the appearance of the application.

### API Integration
If you wish to use a different API for exchange rates, update the context provider in src/CurrencyContext.js to fetch data from the new API endpoint. Make sure to update the logic accordingly if the API's response format differs from the current one.
## Contributing
Contributions are welcome! If you have suggestions for improvements, please fork the repository and submit a pull request. For major changes, please open an issue to discuss what you would like to change.

### Fork the Project
**Create your Feature Branch (git checkout -b feature/YourFeature)**
**Commit your Changes (git commit -m 'Add some YourFeature')**
**Push to the Branch (git push origin feature/YourFeature)**
**Open a Pull Request**

## License
This project is licensed under the MIT License - see the LICENSE file for details.