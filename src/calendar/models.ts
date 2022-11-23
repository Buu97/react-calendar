export interface BaseComponentProps {
    currentDate: Date;
    locale: Locale;
}

export interface WeekDay {
    index: number;
    label: string;
    shortLabel: string;
}

export interface Day extends WeekDay {
    date: Date;
    booked: boolean;
    available: boolean;
    appointed: boolean;
}

export interface DateConfig {
    minDate: Date;
    maxDate: Date;
    appointedDates: Date[];
}
