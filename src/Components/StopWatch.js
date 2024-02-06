import React, { useState, useRef } from 'react';
import logo from '../Assets/Images/stopwatchlogo.webp';

const StopWatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const lap = () => {
        if (isRunning) {
            setLaps([...laps, time]);
        }
    };

    const formatTime = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const centiseconds = Math.floor((milliseconds % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='stopWatchContainer'>
            <div className='stopWatch'>
                <img src={logo} />
                <h1>Stop Watch</h1>
                <p>{formatTime(time)}</p>
                <button onClick={start}>{isRunning ? 'Pause' : 'Start'}</button>
                <button onClick={lap} disabled={!isRunning}>Lap</button>
                <button onClick={reset}>Reset</button>
                {laps.length > 0 && (
                    <div>
                        <h2>Laps</h2>
                        <ul>
                            {laps.map((lapTime, index) => (
                                <li key={index}>{formatTime(lapTime)}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StopWatch;
