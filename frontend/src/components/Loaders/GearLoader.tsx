import Lottie from "lottie-react";
import animationData from "../../assets/gear-original.json";
import { useEffect, useState } from "react";

const WAKEUP_DELAY = 3000;
const MAX_WAIT = 30;

const GearLoader = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(MAX_WAIT);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, WAKEUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showMessage) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [showMessage]);
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <main className="relative min-h-screen flex flex-col justify-between tavern-bg">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-1 items-center justify-center px-4">
          <div className="w-[40vw] max-w-[220px] sm:max-w-[260px] md:max-w-[300px] flex flex-col justify-center items-center">
            <Lottie animationData={animationData} loop />
            {showMessage && (
              <div className="text-sm sm:text-xl opacity-90 text-(--light-color) flex flex-col items-center text-center">
                <p className="mb-1">Waking up the tavern servers…</p>
                <p className="text-base opacity-90">Ready in ~{secondsLeft}s</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GearLoader;
