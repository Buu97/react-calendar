import './App.css';
import Calendar from './calendar/Calendar';
import {useState} from "react";

function App() {
    const [dates] = useState([
        '2022-11-14',
        '2022-11-16',
        '2022-11-18',
        '2022-11-22',
        '2022-11-24'
    ]);

    return (
        <div className="App">
            <Calendar appointedDates={dates}
                      minDate={'2022-11-14'}
                      maxDate={'2022-11-24'} />
        </div>
    );
}

export default App;
