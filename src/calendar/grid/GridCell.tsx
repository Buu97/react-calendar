import {Day} from "../models";
import {useEffect, useMemo, useState, MouseEvent} from "react";
import classNames from "classnames";

interface CalendarGridCellProps {
    day: Day;
}

interface DayState {
    appointed: boolean;
    available: boolean;
    booked: boolean;
}

export default function CalendarGridCell({day}: CalendarGridCellProps) {
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
    }, [day]);

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDayState({
            ...dayState,
            booked: true
        });
    }

    return <div className={classNames('calendar-grid-cell', {...dayState})}>
        <button className="btn w-10 h-100"
                disabled={!day.available}
                onClick={handleClick}>
            {day.shortLabel}
            <span className="appointment-indicator" style={styles.indicator}>.</span>
        </button>
    </div>
}
