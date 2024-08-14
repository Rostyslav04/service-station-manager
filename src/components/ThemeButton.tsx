import React, { useState, useEffect } from 'react';

const ThemeButton: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('darkMode');
        } else {
            document.body.classList.remove('darkMode');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <button onClick={toggleTheme} className="DarkModButton">
            <div className="SunOrMoon"></div>
        </button>
    );
};

export default ThemeButton;
