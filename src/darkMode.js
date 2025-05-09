export function darkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeButton = document.getElementById("dark-mode")

   



    const colorPairs = [
        { light: 'light-pink', dark: 'dark-pink' },
        { light: 'light-blue', dark: 'dark-blue' },
        { light: 'light-green', dark: 'dark-green' },
        { light: 'light-malva', dark: 'dark-malva' },
        { light: 'light-orange', dark: 'dark-orange' }
    ];

    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        darkModeButton.textContent = "🌞"
    }
    else
     darkModeButton.textContent = "🌜"

    colorPairs.forEach(({ light, dark }) => {
        document.querySelectorAll(`.${light}, .${dark}`).forEach(el => {
            if (isDarkMode) {
                el.classList.remove(light);
                el.classList.add(dark);
            } else {
                el.classList.remove(dark);
                el.classList.add(light);
            }
        });
    });
}