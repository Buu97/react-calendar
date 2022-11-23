import { format, sub, add } from "date-fns";
import {MouseEvent, useEffect, useState} from "react"
import { BaseComponentProps } from "../models";

export interface ToolbarProps extends BaseComponentProps {
    onDateChange?: (date: Date) => any;
    minDate: Date;
    maxDate: Date;
}

export default function Toolbar(props: ToolbarProps) {
    const [navigationState, setNavigationState] = useState({disabledNext: false, disabledPrevious: false});

    useEffect(() => {
        const previousMonth = sub(props.currentDate, {months: 1});
        const nextMonth = add(props.currentDate, {months: 1});

        setNavigationState({
            disabledNext: nextMonth.getMonth() > props.maxDate?.getMonth(),
            disabledPrevious: previousMonth.getMonth() < props.minDate?.getMonth()
        })
    }, [props.minDate, props.maxDate, props.currentDate]);

    const handleClickNext = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newDate = add(props.currentDate, {months: 1});
        if (props.onDateChange) {
            props.onDateChange(newDate);
        }
    }

    const handleClickPrevious = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newDate = sub(props.currentDate, {months: 1});
        if (props.onDateChange) {
            props.onDateChange(newDate);
        }
    }

    return <div className="d-flex justify-content-between align-items-center">
        <button className="btn"
                onClick={handleClickPrevious}
                disabled={navigationState.disabledPrevious}>
            <span className="material-symbols-outlined">
                chevron_left
            </span>
        </button>

        <span className="fw-bold">
            {format(props.currentDate, 'LLLL yyyy', {locale: props.locale})}
        </span>

        <button className="btn"
                onClick={handleClickNext}
                disabled={navigationState.disabledNext}>
            <span className="material-symbols-outlined">
                chevron_right
            </span>
        </button>
    </div>
}
