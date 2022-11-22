import { format, sub, add } from "date-fns";
import {MouseEvent} from "react"
import { BaseComponentProps } from "../models";

export interface ToolbarProps extends BaseComponentProps {
    onDateChange?: (date: Date) => any
}

export default function Toolbar(props: ToolbarProps) {
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
        <button className="btn" onClick={handleClickPrevious}>
            <span className="material-symbols-outlined">
                chevron_left
            </span>
        </button>

        <span className="fw-bold">
            {format(props.currentDate, 'LLLL yyyy', {locale: props.locale})}
        </span>

        <button className="btn" onClick={handleClickNext}>
            <span className="material-symbols-outlined">
                chevron_right
            </span>
        </button>
    </div>
}
