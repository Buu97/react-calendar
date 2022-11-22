import { format } from "date-fns";
import { BaseComponentProps } from "../models";

export interface ToolbarProps extends BaseComponentProps {
}

export default function Toolbar(props: ToolbarProps) {
    return <div className="d-flex justify-content-between align-items-center">
        <button className="btn">
            <span className="material-symbols-outlined">
                chevron_left
            </span>
        </button>

        <span className="fw-bold">
            {format(props.currentDate, 'LLLL yyyy', {locale: props.locale})}
        </span>

        <button className="btn">
            <span className="material-symbols-outlined">
                chevron_right
            </span>
        </button>
    </div>
}