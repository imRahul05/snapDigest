
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


const fetchNewsFromAddress = async (city, state) => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const locationKeyword = city || state || "India";

  const newsRes = await fetch(
    `https://newsapi.org/v2/everything?q=${locationKeyword}&apiKey=${API_KEY}`
  );
  const newsData = await newsRes.json();
  return newsData.articles;
};


export { getCurrentPosition, fetchLocationName ,fetchNewsFromAddress};
