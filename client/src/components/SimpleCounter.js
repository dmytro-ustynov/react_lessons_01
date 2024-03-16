import {useState} from "react";

export default function SimpleCounter() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Counter example</h1>
            <h2>{count}</h2>
            <button className="counterBtn plusCnt"
                    onClick={() => setCount(count + 1)}>Up</button>
            <button className="counterBtn minusCnt"
                    onClick={() => setCount(count - 1)}>Down</button>
            <button className="counterBtn rndmCnt"
                    onClick={() => setCount(Math.floor(Math.random()*100))}>RNDM</button>
        </div>)
}