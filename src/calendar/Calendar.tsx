import Paper from "@mui/material/Paper";
import { useState } from "react";
import fr from "date-fns/locale/fr";
import Toolbar from "./toolbar/Toolbar";
import CalendarGrid from "./grid/Grid";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    return <Paper elevation={3}>
        <Toolbar currentDate={currentDate}
                 locale={fr}
                 onDateChange={date => setCurrentDate(date)} />

        <CalendarGrid currentDate={currentDate}
                      locale={fr} />
    </Paper>
}
