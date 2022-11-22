import { BaseComponentProps } from "../models";
import CalendarGridHeader from "./GridHeader";

export interface CalendarGridProps extends BaseComponentProps {}

export default function CalendarGrid(props: CalendarGridProps) {
    return <div>
        <CalendarGridHeader />
    </div>
}