import styles from './App.module.scss'
import Refresh from './assets/refresh.svg'
import Logo from './assets/MatchTracker.svg'
import Error from './assets/alert-triangle.svg'
import Icon from './assets/icon.svg'
import {useEffect, useState} from "react";
import classNames from "*.module.scss";

const App = () => {
    const [matches, setMatches] = useState([])
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://app.ftoyd.com/fronttemp-service/fronttemp')
            if (!response.ok) {
                console.error(response)
                setError(true)
            }
            const json = await response.json()
            setMatches(json.data.matches)
        } catch (error) {
            console.error(error.message)
            setError(true)
        }
    }

    const refresh = () => {
        setLoading(true)
        fetchData()
        setLoading(false)
    }



    return (
        <div className='mainContainer'>
            <div className={styles.head}>
                <Logo className={styles.logo}/>
                <div className={styles.actions}>
                    {error && (
                        <p className={styles.error}>
                            <Error/>
                            <span>Ошибка: не удалось загрузить информацию</span>
                        </p>
                    )}

                    <button className={styles.refreshBtn} onClick={refresh}>
                        <span>Обновить</span>
                        {loading && <Refresh/>}
                    </button>
                </div>
            </div>
            <div className={styles.matches}>

                {matches.map((match, index) => (
                    <div className={styles.match} key={`${match.title}-${index}`}>
                        <div className={styles.left}>
                            <Icon/>
                            <span>{match.homeTeam.name}</span>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.score}>{match.homeScore} : {match.awayScore}</p>
                            <p className={
                                `${styles.status}
                                ${match.status == 'Ongoing' ? styles.live : match.status == 'Finished' ? styles.finished : styles.scheduled}`
                            }>{match.status == 'Ongoing' ? 'Live' : match.status == 'Finished' ? 'Finished' : 'Match preparing'}</p>

                        </div>
                        <div className={styles.right}>
                            <span>{match.awayTeam.name}</span>
                            <Icon/>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default App;