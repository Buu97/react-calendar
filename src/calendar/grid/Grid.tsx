import {useEffect, useState} from "react";
import {setDate, getDaysInMonth, format} from "date-fns";
import { BaseComponentProps, Day } from "../models";
import CalendarGridHeader from "./GridHeader";
import CalendarGridCell from "./GridCell";

export interface CalendarGridProps extends BaseComponentProps {}

export default function CalendarGrid(props: CalendarGridProps) {
    const [days, setDays] = useState<Day[]>([]);

    useEffect(() => {
        const firstDay = setDate(props.currentDate, 1);
        const length = getDaysInMonth(firstDay);
        const offset = Array.from({length: 7 - (firstDay.getDay() || 7)}) as any[];
        const monthDays = Array.from({length}).map((_, index) => {
            const date = setDate(props.currentDate, index + 1);
            return {
                index,
                appointed: false,
                available: true,
                booked: false,
                date,
                label: format(date, 'EEEE, dd LLLL yyyy'),
                shortLabel: format(date, 'd')
            } as Day;
        });

        setDays([...offset, ...monthDays]);
    }, [props.currentDate]);

    return <div>
        <CalendarGridHeader locale={props.locale} />
        <hr/>
        <div className="calendar-grid">
            {days.map((day, index) => {
                return day ?
                    <CalendarGridCell key={index} day={day} /> :
                    <div className={'calendar-grid-cell'} key={index}></div>
            })}
        </div>
    </div>
}
