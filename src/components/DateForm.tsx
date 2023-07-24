import { useEffect, useState } from 'react';
import { IBarber, ILocation } from '../interfaces/interfaces';
import '../styling/DateForm.scss';
import DayCard from './DayCard';
import DayDetailed from './DayDetailed';

interface Props {
    barber: IBarber | undefined;
    barbershop: ILocation | undefined;
    setFormTime: (date: Date, timeslot: number) => void;
    setFormBarber: (barber: IBarber) => void;
    setFormTimeBarber: (date: Date, timeslot: number, barber: IBarber) => void;
}

const DateForm: React.FC<Props> = ( {barber, barbershop, setFormTime, setFormBarber, setFormTimeBarber} ) => {
  // Gets current date and renders 5 days including today
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateArray, setDateArray] = useState<Date[]>(createDateArray(21));
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function createDateArray(numberOfDays: number) {
    let result = [];
    let date = currentDate;
    for (let i = 0; i < numberOfDays; i++) {
        result.push(date)
        date = addDays(date, 1);
    }
    return result;
  }

  function increaseWeek(e: any) {
    e.preventDefault();
    
    if (selectedWeekIndex < (dateArray.length / 7) - 1) {
        setSelectedDate(addDays(selectedDate, 7));
        setSelectedWeekIndex(selectedWeekIndex + 1);
    }
  }

  function decreaseWeek(e: any) {
    e.preventDefault();
    if (selectedWeekIndex > 0) {
        setSelectedDate(addDays(selectedDate, -7));
        setSelectedWeekIndex(selectedWeekIndex - 1);
    }
    
  }

  useEffect(() => {
    function getWeek(week: number) {
        let start = week*7;
        let end = start + 7;
        let result = dateArray.slice(start, end);
        //console.log(result);
        return result;
      }

    setSelectedWeek(getWeek(selectedWeekIndex));
  }, [selectedWeekIndex, dateArray]);

  return (
    <form className="dateForm">
        <h1 className='sectionAnnounce'>Select time: </h1>
        <div className='dateSelector'>
            <button className='back' onClick={decreaseWeek}>&lt;-</button>
                {selectedWeek.map((day) => {
                    return (
                        <DayCard day={day} selectedDate={selectedDate} setSelectedDate={setSelectedDate} key={day.getDate()}/>
                    )
                })}
            <button className='forward' onClick={increaseWeek}>-&gt;</button>
        </div>
        {selectedDate !== undefined && 
            <DayDetailed day={selectedDate} barber={barber} setFormBarber={setFormBarber} setFormTimeBarber={setFormTimeBarber} barbershop={barbershop} setFormTime={setFormTime}/>
        }
    </form>
  );
}

export default DateForm;
