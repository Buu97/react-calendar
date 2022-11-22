import { WeekDay } from "../models"

export interface CalendarGridHeaderCellProps {
    day: WeekDay;
}

export default function CalendarGridHeaderCell(props: CalendarGridHeaderCellProps) {
    return <div className="calendar-grid-header-cell calendar-grid-cell">
        {props.day.shortLabel}
    </div>
}