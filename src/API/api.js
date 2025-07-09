import axios from 'axios';
const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;

const getCurrentPosition = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    onError(new Error("Geolocation is not supported"));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      onSuccess({ latitude, longitude });
    },
    (err) => {
      console.error("Geolocation Error:", err);
      onError(err);
    }
  );
};

const fetchLocationName = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODE_API_KEY}`
    );
    const data = await res.json();
    const components = data.results[0]?.components || {};
    const formatted = data.results[0]?.formatted || "Unknown location";

    return {
      formatted,
      city: components.city || components.town || components.village,
      state: components.state,
    };
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    return {
      formatted: "Unable to fetch location",
      city: null,
      state: null,
    };
  }
};


// const fetchNewsFromAddress = async (city, state) => {
//   const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
//   const locationKeyword = city || state || "India";

//   const newsRes = await fetch(
//     `https://newsapi.org/v2/everything?q=${locationKeyword}&apiKey=${API_KEY}`
//   );
//   const newsData = await newsRes.json();
//   return newsData.articles;
// };
// const fetchNewsFromAddress = async (city, state) => {
//   const keywordParts = ["India"];

//   if (state) keywordParts.unshift(state);  // add to beginning
//   if (city) keywordParts.unshift(city);    // add to beginning

//   const keyword = keywordParts.join(" "); // e.g., "Bangalore Karnataka India"

//   const options = {
//     method: 'GET',
//     url: 'https://google-news13.p.rapidapi.com/search',
//     params: {
//       keyword,
//       lr: 'en-US'
//     },
//     headers: {
//       'x-rapidapi-key': import.meta.env.VITE_NEWS_API_KEY,
//       'x-rapidapi-host': 'google-news13.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response)
//     return response.data.items || [];
//   } catch (error) {
//     console.error("Failed to fetch keyword news:", error.response?.data || error.message);
//     return [];
//   }
// };

 const fetchNewsFromAddress = async (keyword = "India", results = 10) => {
  const API_KEY = '686df453c4bb47c64aeef35a'; 

  const url = `https://api.scrapingdog.com/google_news/?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}&results=${results}&country=us`;

  try {
    const response = await axios.get(url);
    console.log(response.data.news_results)
    if (response.data.success === false) {
      throw new Error(response.data.message || "Unknown error");
    }

    return response.data.news_results || [];
  } catch (error) {
    console.error("🛑 Failed to fetch Google News:", error.message || error);
    return [];
  }
};

export { getCurrentPosition, fetchLocationName ,fetchNewsFromAddress};
