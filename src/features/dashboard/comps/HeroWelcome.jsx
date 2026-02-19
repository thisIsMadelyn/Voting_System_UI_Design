// import { useQuery } from '@tanstack/react-query';
// import { useState, useEffect } from 'react';
// import { getCurrentProfile } from '../../../services/UsersApi.js';
// import { getLocalWeather } from '../../../services/weatherService.js';
// import WeatherWidget from './WeatherWigdet';
// import styles from './HeroWelcome.module.css';
//
// export default function HeroWelcome({ date }) {
//
//     const [currentTime, setCurrentTime] = useState(new Date());
//
//     useEffect(() => {
//         const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//         return () => clearInterval(timer);
//     }, []);
//
//     const formattedDate = currentTime.toLocaleDateString('en-US', {
//         weekday: 'long',
//         month: 'short',
//         day: 'numeric'
//     })
//     // 1. Fetch User Data
//     const { data: user, isLoading: userLoading } = useQuery({
//         queryKey: ['currentUser'],
//         queryFn: getCurrentProfile
//     });
//
//     // 2. Fetch Weather Data
//     const { data: weatherData, isLoading: weatherLoading } = useQuery({
//         queryKey: ['localWeather'],
//         queryFn: getLocalWeather
//     });
//
//     // 3. Fallbacks while loading
//     const displayName = userLoading ? 'Loading...' : user?.username;
//
//     return (
//         <div className={styles.hero}>
//             <div className={styles.glow} />
//             <div className={styles.bar} />
//
//             <div className={styles.left}>
//                 <p className={styles.greeting}>
//                     <span className={styles.greetingLine} />
//                     {date}
//                 </p>
//                 <h1 className={styles.title}>
//                     Welcome back,<br />
//                     <span className={styles.highlight}>{displayName}.</span>
//                 </h1>
//                 <p className={styles.subtitle}>
//                     You have <strong>2 open polls</strong> awaiting member votes,{' '}
//                     <strong>3 events</strong> this week, and one pending membership request.
//                 </p>
//             </div>
//
//             {/* Only render weather if we have data */}
//             {!weatherLoading && weatherData && (
//                 <WeatherWidget data={weatherData.current_weather} />
//             )}
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentProfile } from '../../../services/UsersApi.js';
import { getLocalWeather } from '../../../services/weatherService.js'; // Adjust path as needed
import styles from './HeroWelcome.module.css';
import WeatherWidget from './WeatherWigdet';

export default function HeroWelcome() { // Removed { date } prop
    // 1. Live Date Logic
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    // 2. Fetch User Data
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentProfile
    });

    // 3. Fetch Weather Data
    const { data: weatherData, isLoading: weatherLoading } = useQuery({
        queryKey: ['localWeather'],
        queryFn: getLocalWeather
    });

    const displayName = userLoading ? 'Loading...' : user?.username || 'User';

    return (
        <div className={styles.hero}>
            <div className={styles.glow} />
            <div className={styles.bar} />

            <div className={styles.left}>
                <p className={styles.greeting}>
                    <span className={styles.greetingLine} />
                    {/* Now using the live formattedDate instead of the prop */}
                    {formattedDate}
                </p>
                <h1 className={styles.title}>
                    Welcome back,<br />
                    <span className={styles.highlight}>{displayName}.</span>
                </h1>
                <p className={styles.subtitle}>
                    You have <strong>2 open polls</strong> awaiting member votes,{' '}
                    <strong>3 events</strong> this week, and one pending membership request.
                </p>
            </div>

            {!weatherLoading && weatherData && (
                <WeatherWidget data={weatherData.current_weather} />
            )}
        </div>
    );
}