import {useEffect, useState} from "react";
import {min, max} from 'date-fns';
import fr from "date-fns/locale/fr";
import Toolbar from "./toolbar/Toolbar";
import CalendarGrid from "./grid/Grid";
import {DateConfig} from "./models";

export interface CalendarProps {
    minDate?: Date | string;
    maxDate?: Date | string;
    appointedDates: (Date | string)[];
    onDateSelection?: (dates: Date[]) => any;
}

export default function Calendar(props: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dateConfig, setDateConfig] = useState<DateConfig>({
        minDate: new Date(),
        maxDate: new Date(),
        appointedDates: []
    });

    useEffect(() => {
        const appointedDates = props.appointedDates.map(d => new Date(d));
        setDateConfig({
            appointedDates: appointedDates,
            minDate: props.minDate ? new Date(props.minDate) : min(appointedDates),
            maxDate: props.maxDate ? new Date(props.maxDate) : max(appointedDates)
        });
    }, [props.appointedDates, props.minDate, props.maxDate]);

    const handleDateSelection = (dates: Date[]) => {
        if (props.onDateSelection) {
            props.onDateSelection(dates);
        }
    }

    return <div className={'calendar card card-body'}>
        <Toolbar currentDate={currentDate}
                 minDate={dateConfig.minDate}
                 maxDate={dateConfig.maxDate}
                 locale={fr}
                 onDateChange={date => setCurrentDate(date)} />

        <CalendarGrid currentDate={currentDate}
                      locale={fr}
                      appointedDates={dateConfig.appointedDates}
                      maxDate={dateConfig.maxDate}
                      minDate={dateConfig.minDate}
                      onDateSelection={handleDateSelection} />
    </div>
}
