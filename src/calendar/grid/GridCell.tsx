import {Day} from "../models";
import {useEffect, useMemo, useState, MouseEvent} from "react";
import classNames from "classnames";

interface CalendarGridCellProps {
    day: Day;
    onDaySelection?: (day: Day) => any;
}

interface DayState {
    appointed: boolean;
    available: boolean;
    booked: boolean;
}

export default function CalendarGridCell({day, onDaySelection}: CalendarGridCellProps) {
    const [dayState, setDayState] = useState<DayState>({appointed: false, available: true, booked: false});
    const styles = useMemo<{indicator: {visibility: VisibilityState}}>(() => {
        return {
            indicator: {
                visibility: dayState.appointed ? 'visible' : 'hidden'
            }
        }
    }, [dayState.appointed]);

    useEffect(() => {
        setDayState({
            appointed: day.appointed,
            available: day.available,
            booked: day.booked
        });
    }, [day.appointed, day.booked, day.available]);

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDaySelection) {
            onDaySelection(day);
        }
    }

    return <div className={classNames('calendar-grid-cell', {...dayState})}>
        <button className="btn w-10 h-100"
                disabled={!day.available}
                onClick={handleClick}>
            {day.shortLabel}
            <span className="appointment-indicator" style={styles.indicator}>.</span>
            {dayState.booked ?
                <span className="booked-indicator">
                    <span className="material-symbols-outlined text-white">
                        check
                    </span>
                </span>:
                <></>}
        </button>
    </div>
}
