export const getLocalWeather = async () => {
    // Coordinates for Thessaloniki
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.64&longitude=22.94&current_weather=true';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    return response.json();
};