import {setDay, format} from 'date-fns';
import { useEffect, useState } from 'react';
import {WeekDay} from '../models';
import CalendarGridHeaderCell from './GridHeaderCell';

interface CalendarGridHeaderProps {
    locale: Locale;
}

export default function CalendarGridHeader(props: CalendarGridHeaderProps) {
    const [days, setDays] = useState<WeekDay[]>([]);

    useEffect(() => {
      const today = new Date();
      const weekDays = Array.from({length: 7}).map((_, index) => {
        const day = setDay(today, index);
        return {
          index,
          label: format(day, 'EEEE', {locale: props.locale}),
          shortLabel: format(day, 'EEE', {locale: props.locale})
        };
      });
      setDays(weekDays);
    }, [props.locale]);


    return <div className="calendar-grid calendar-grid-header">
      {days.map(day => <CalendarGridHeaderCell day={day} key={day.index} />)}
    </div>
}
