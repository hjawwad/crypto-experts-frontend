import "@/styles/globals.css";
import ThemeContext from "../ThemeContext";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);
  const color = { white: "#FFFFFF", dark: "#191919" };

  useEffect(() => {
    localStorage.setItem("myContextValue", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, color }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
