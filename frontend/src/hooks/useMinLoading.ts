import { useEffect, useRef, useState } from "react";

const useMinLoading = (isLoading: boolean, minTime = 500) => {
  const [showLoader, setShowLoader] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // clear any pending timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isLoading) {
      timeoutRef.current = setTimeout(() => {
        setShowLoader(false);
      }, minTime);
      return;
    }

    // schedule show (async to satisfy lint rule)
    timeoutRef.current = setTimeout(() => {
      setShowLoader(true);
    }, 0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading, minTime]);

  return showLoader;
};

export default useMinLoading;
