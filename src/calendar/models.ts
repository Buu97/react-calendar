export interface BaseComponentProps {
    currentDate: Date;
    locale: Locale;
}

export interface WeekDay {
    index: number;
    label: string;
    shortLabel: string;
}