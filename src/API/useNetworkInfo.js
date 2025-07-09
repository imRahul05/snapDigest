
import { useEffect, useState } from "react";

const getNetworkInfo = () => {
  if ("connection" in navigator) {
    const { effectiveType, downlink } = navigator.connection;
    return {
      effectiveType: effectiveType || "unknown",
      downlink: downlink || 0, 
    };
  }
  return {
    effectiveType: "unknown",
    downlink: 0,
  };
};

const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState(getNetworkInfo());

  useEffect(() => {
    const updateNetworkInfo = () => {
      setNetworkInfo(getNetworkInfo());
    };

    if ("connection" in navigator) {
      navigator.connection.addEventListener("change", updateNetworkInfo);
    }

    return () => {
      if ("connection" in navigator) {
        navigator.connection.removeEventListener("change", updateNetworkInfo);
      }
    };
  }, []);

  return networkInfo;
};

export default useNetworkInfo;
