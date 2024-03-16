import {useEffect, useState} from "react";


const TODAY = new Date()
export default function TrainTimer() {
    const [time, setTime] = useState('')
    const [hours, setHours] = useState(22)
    const [minutes, setMinutes] = useState(30)
    const [departure, setDeparture] = useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), hours, minutes, 0))

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const diff = departure - now
            const hours = Math.floor(diff / 1000 / 60 / 60)
            const minutes = Math.floor(diff / 1000 / 60 - hours * 60)
            const seconds = Math.floor(diff / 1000 - hours * 60 * 60 - minutes * 60)
            setTime(`${hours}h ${minutes}m ${seconds}s`)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [departure]);

    return (
        <div>
            <h1>Train Timer</h1>
            <h2>Train departure: </h2>
            <h3>Ваш потяг відправляється о {departure.getHours()}:{departure.getMinutes()}</h3>
            <p>Залишилось часу: {time}</p>

            <br/>
            Час відправлення потягу -
            <input type="number"
                   value={hours}
                   onChange={(e) => setHours(e.target.value)}
                   name="Hours" min="0" max="23" step={1}/>:
            <input type="number"
                   value={minutes}
                   onChange={(e) => setMinutes(e.target.value)}
                   name="Minutes" min="0"
                   max="50" step={10}/>
            <button
                onClick={() => setDeparture(new Date(TODAY.getFullYear(),
                    TODAY.getMonth(), TODAY.getDate(), hours, minutes, 0))}>Встановити
            </button>
        </div>
    )
}