import { useEffect, useState } from 'react';

export const useThemeDetector = () => {
    const getCurrentTheme = () =>
        {return (localStorage.theme ? (localStorage.theme === 'dark') : window.matchMedia('(prefers-color-scheme: dark)').matches)};
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
    const mqListener = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
        localStorage.theme = e.matches ? "dark" : "light";
    };

    useEffect(() => {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        darkThemeMq.addEventListener('change', mqListener);

        return () => darkThemeMq.removeEventListener('change', mqListener);
    }, []);

    return isDarkTheme;
};
