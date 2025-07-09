// src/hooks/useNetworkInfo.js
import { useEffect, useState } from "react";

const getEffectiveConnectionType = () => {
  if ('connection' in navigator) {
    return navigator.connection.effectiveType;
  }
  return 'unknown';
};

const useNetworkInfo = () => {
  const [connectionType, setConnectionType] = useState(getEffectiveConnectionType());

  useEffect(() => {
    const updateConnection = () => {
      setConnectionType(getEffectiveConnectionType());
    };

    if ('connection' in navigator) {
      navigator.connection.addEventListener("change", updateConnection);
    }

    return () => {
      if ('connection' in navigator) {
        navigator.connection.removeEventListener("change", updateConnection);
      }
    };
  }, []);

  return connectionType;
};

export default useNetworkInfo;
