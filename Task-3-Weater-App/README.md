# 🌦️ Atmos — Weather Intelligence

A modern, responsive weather application that delivers current weather conditions, upcoming forecasts, and essential atmospheric details through a sleek, dark-themed interface.

🔗 **Live Demo:** https://atmos-weather-intelligence.vercel.app/

## ✨ Features

* 🌍 **City Search:** Search for a city and retrieve its weather information.
* 🌡️ **Current Weather:** View temperature, feels-like temperature, and weather conditions.
* 💧 **Weather Details:** Check humidity, wind speed, atmospheric pressure, and visibility.
* 🌅 **Sunrise & Sunset:** View sunrise and sunset times for the selected city.
* 🕒 **Hourly Forecast:** Explore upcoming weather conditions and temperatures.
* 📅 **Five-Day Forecast:** View the upcoming five-day weather outlook.
* 🔄 **Loading Animation:** Visual feedback while weather information is being fetched.
* ⚠️ **Error Handling:** Displays messages for invalid city names and failed requests.
* 📱 **Responsive Interface:** Designed for desktop and mobile screens.
* 🎨 **Modern UI:** Dark theme with glassmorphism and neon-inspired accents.

## 🛠️ Tech Stack

| Technology                  | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| HTML5                       | Webpage structure                               |
| CSS3                        | Styling, responsive layouts, and visual effects |
| JavaScript                  | Dynamic rendering and API integration           |
| OpenWeatherMap API          | Weather and forecast data                       |
| Vercel Serverless Functions | Backend API requests                            |
| Vercel                      | Hosting and deployment                          |
| GitHub                      | Source code management                          |

## 📂 Project Structure

```text
Task-3-Weather-App/
├── api/
│   ├── weather.js
│   └── forecast.js
├── assets/
│   └── images/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── script.js
└── style.css
```

## ⚙️ How It Works

1. Enter a city name in the search field.
2. The frontend sends a request to the corresponding serverless function.
3. The backend retrieves weather information from OpenWeatherMap.
4. The application processes the response and dynamically updates the interface.
5. Current weather, hourly forecast cards, and the five-day forecast are displayed.

## 🔌 API Endpoints

The application uses two serverless functions:

**Current Weather**

```text
/api/weather?city=Chennai
```

Retrieves current weather information for the specified city.

**Weather Forecast**

```text
/api/forecast?city=Chennai
```

Retrieves forecast information used by the hourly and five-day forecast sections.

## 🚀 Run Locally

### Prerequisites

* Node.js and npm
* A Vercel account
* An OpenWeatherMap API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd Task-3-Weather-App
```

### 3. Install the Vercel CLI

```bash
npm install -g vercel
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

Replace the placeholder with your actual API key.

### 5. Start the development server

```bash
vercel dev
```

Open the local URL displayed in your terminal.

**Security:** Never commit your `.env` file or expose your API key in frontend JavaScript. Keep `.env` listed in `.gitignore`.

## 🌐 Deployment

Atmos is deployed using Vercel.

To deploy your own instance:

1. Import the GitHub repository into Vercel.
2. Set the root directory to `Task-3-Weather-App` if deploying from the parent internship repository.
3. Configure `OPENWEATHER_API_KEY` in the project's environment variables.
4. Deploy the application.
5. Test the current weather and forecast features.

## 🔐 Security

The application uses serverless functions to keep the OpenWeatherMap API key on the server rather than exposing it in the frontend source code.

* The API key is stored in environment variables.
* The frontend communicates with the application's backend endpoints.
* The `.env` file should remain excluded from version control.

## 🎯 Project Objective

This project demonstrates practical skills in frontend development, asynchronous JavaScript, third-party API integration, responsive web design, error handling, and serverless backend development.

## 👨‍💻 Developer

**Mohammed Shameem**
B.Sc. Computer Science Graduate
Interested in Python Development and Web Technologies

## 📌 Internship Project

Developed as part of the **Datheon Full Stack Web Development Internship**.

---

⭐ If you find this project interesting, feel free to explore the live demo!
