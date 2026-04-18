import styles from './WeatherWigdet.module.css'
import Icon from "../../../components/ui/Icon.jsx";

// Helper function to map WMO codes to UI data
const getWeatherDetails = (code) => {
    if (code === 0) return { label: 'Clear Sky', icon: 'sun' };
    if (code > 0 && code <= 3) return { label: 'Cloudy', icon: 'cloud' };
    if (code >= 45 && code <= 48) return { label: 'Foggy', icon: 'cloud-drizzle' };
    if (code >= 51 && code <= 67) return { label: 'Rain', icon: 'cloud-rain' };
    if (code >= 71 && code <= 77) return { label: 'Snow', icon: 'cloud-snow' };
    if (code >= 95) return { label: 'Thunderstorm', icon: 'cloud-lightning' };
    return { label: 'Unknown', icon: 'help-circle' };
};

export default function WeatherWidget({ data }) {
    // If data is missing for any reason, don't crash the page
    if (!data) return null;

    const { temperature, weathercode } = data;
    const details = getWeatherDetails(weathercode);

    return (
        <div className={styles.widget}>
            <div className={styles.iconWrapper}>
                <Icon name={details.icon} size={24} />
            </div>
            <div className={styles.info}>
                <p className={styles.temp}>{Math.round(temperature)}°C</p>
                <p className={styles.condition}>{details.label}</p>
                <p className={styles.location}>Thessaloniki</p>
            </div>
        </div>
    );
}