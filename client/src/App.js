import './App.css';
import MyTable from "./components/MyTable";
import Recipes from "./components/Recipes";
import Todos from "./components/Todos";
import {useState} from "react";
import SimpleCounter from "./components/SimpleCounter";
import TrainTimer from "./components/TrainTimer";

function App() {
    const [selectedTab, setSelectedTab] = useState('recipe');
    return (
        <div className="App">
            <div className="main-container">
                <div className="tabs">
                    <h4>Select example</h4>
                    <button className="componentBtn" onClick={() => setSelectedTab('users')}>Users</button>
                    <button className="componentBtn" onClick={() => setSelectedTab('recipe')} >Recipes</button>
                    <button className="componentBtn" onClick={() => setSelectedTab('todos')}>Todos</button>
                    <button className="componentBtn" onClick={() => setSelectedTab('counter')}>Counter</button>
                    <button className="componentBtn" onClick={() => setSelectedTab('timer')}>Timer</button>
                </div>
                <div className="component">
                    {selectedTab === 'users' && <MyTable/>}
                    {selectedTab === 'recipe' && <Recipes/>}
                    {selectedTab === 'todos' && <Todos/>}
                    {selectedTab === 'counter' && <SimpleCounter/>}
                    {selectedTab === 'timer' && <TrainTimer/>}
                </div>
            </div>
        </div>
    );
}

export default App;
