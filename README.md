# SnapDigest

SnapDigest is an adaptive news reader application that personalizes content based on user location and network conditions. Built with React and Vite, the application delivers relevant news content while optimizing for various network speeds.

![SnapDigest Logo](public/snapdigest-logo.png)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [APIs Used](#apis-used)
- [JavaScript APIs](#javascript-apis)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Location-Based News**: Get news relevant to your current location
- **Adaptive Content Delivery**: Content quality adapts based on network speed
- **Responsive Design**: Fully responsive with hamburger menu on mobile
- **Network Speed Detection**: Automatically detects and adapts to network conditions
- **Progress Indicator**: Visual progress bar while reading articles
- **Offline Support**: Basic caching for offline reading

## 🔧 Technologies Used

- **React**: UI library for building component-based interfaces
- **React Router**: For navigation and routing
- **Vite**: Next-generation frontend tooling
- **Axios**: HTTP client for making API requests
- **CSS3**: Styling with modern CSS features

## 🌐 APIs Used

SnapDigest leverages several external APIs to provide its functionality:

1. **OpenCage Geocoding API**
   - Used for reverse geocoding (converting coordinates to location names)
   - Retrieves city and state information based on latitude and longitude
   - API Key required (see Environment Variables section)

2. **RapidAPI Real-Time News Data API**
   - Fetches news articles based on location keywords
   - Provides article title, description, source, and image URLs
   - Filters for relevance to user's location
   - API Key required (see Environment Variables section)

## 🧠 JavaScript APIs

The application utilizes several browser JavaScript APIs:

1. **Geolocation API**
   - `navigator.geolocation.getCurrentPosition()`: Gets user's current coordinates
   - Implementation in `src/API/api.js`
   - Requires user permission, which is handled in the AdaptiveNewsReader component

2. **Network Information API**
   - `navigator.connection`: Detects connection type (4g, 3g, 2g, etc.)
   - Implementation in `src/API/useNetworkInfo.js`
   - Custom React hook that monitors and responds to network changes
   - Enables adaptive content delivery based on connection quality

3. **Permissions API**
   - `navigator.permissions.query()`: Checks and requests geolocation permissions
   - Implementation in AdaptiveNewsReader component
   - Tracks permission state changes with `result.onchange` event

4. **Canvas API**
   - Used in `src/components/CanvasProgressBar.jsx`
   - Creates a smooth progress indicator with gradient and animation effects

5. **Intersection Observer API**
   - Detects when articles are visible in the viewport
   - Enables highlighting of currently visible articles
   - Improves user experience by drawing attention to current content

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snapdigest.git
cd snapdigest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see Environment Variables section)

4. Start development server:
```bash
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_GEOCODE_API_KEY=your_opencage_api_key
VITE_NEWS_API_KEY=your_rapidapi_key
```

## 🖥️ Usage

1. Allow location access when prompted
2. Browse news articles relevant to your location
3. Navigate between Home, News, and About pages
4. Experience adaptive content based on your network speed

## 📁 Project Structure

```
├── public/              # Static assets
├── src/                 # Source code
│   ├── API/             # API and hook functions
│   │   ├── api.js       # External API integration
│   │   └── useNetworkInfo.js  # Custom network detection hook
│   ├── assets/          # Images and other assets
│   ├── components/      # React components
│   │   ├── AdaptiveNewsReader.jsx  # Main news component
│   │   ├── ArticleCard.jsx  # News article display
│   │   ├── CanvasProgressBar.jsx  # Reading progress indicator
│   │   └── Navbar.jsx  # Navigation component
│   ├── Pages/          # Page components
│   │   ├── About.jsx   # About page
│   │   └── HomePage.jsx  # Landing page
│   ├── styles/         # CSS styles
│   ├── App.jsx         # Main App component with routing
│   └── main.jsx        # Entry point
└── index.html          # HTML template
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
