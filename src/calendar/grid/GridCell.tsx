import {Day} from "../models";

interface CalendarGridCellProps {
    day: Day;
}

export default function CalendarGridCell({day}: CalendarGridCellProps) {
    return <div className="calendar-grid-cell">
        {day.shortLabel}
    </div>
}
