import {useEffect, useState} from "react";
import {setDate, getDaysInMonth, format, startOfMonth} from "date-fns";
import {BaseComponentProps, DateConfig, Day} from "../models";
import CalendarGridHeader from "./GridHeader";
import CalendarGridCell from "./GridCell";

export interface CalendarGridProps extends BaseComponentProps, DateConfig {
    onDateSelection?: (dates: Date[]) => any;
}

export default function CalendarGrid(props: CalendarGridProps) {
    const [days, setDays] = useState<Day[]>([]);
    const [blankDays, setBlankDays] = useState(0);

    useEffect(() => {
        const firstDay = startOfMonth(props.currentDate);
        const length = getDaysInMonth(firstDay);
        const monthDays = Array.from({length}).map((_, index) => {
            const date = setDate(props.currentDate, index + 1);
            const appointed = props.appointedDates.findIndex(d => {
                return format(d, 'dd-MM-yyyy') === format(date, 'dd-MM-yyyy')
            }) > -1;
            return {
                index,
                appointed: appointed,
                available: appointed,
                booked: false,
                date,
                label: format(date, 'EEEE, dd LLLL yyyy'),
                shortLabel: format(date, 'd')
            } as Day;
        });

        setBlankDays(firstDay.getDay());
        setDays(monthDays);
    }, [props.currentDate, props.minDate, props.maxDate, props.appointedDates]);

    const handleDaySelection = (day: Day) => {
        const monthDay = days[day.index];
        monthDay.booked = !monthDay.booked;
        setDays(days.map(d => d.index === day.index ? monthDay : d));

        if (props.onDateSelection) {
            props.onDateSelection(days.reduce((acc, day) => {
                if (day.booked) {
                    acc = acc.concat([day.date]);
                }
                return acc;
            }, [] as Date[]));
        }
    }

    return <div>
        <CalendarGridHeader locale={props.locale} />
        <hr className={'calendar-grid-separator'} />
        <div className="calendar-grid">
            {Array.from({length: blankDays}).map((_, index) => <div className={'calendar-grid-cell'} key={index}></div>)}

            {days.map((day, index) => <CalendarGridCell key={index} day={day} onDaySelection={handleDaySelection} />)}
        </div>
    </div>
}
