import { useEffect, useState } from 'react';
import '../styling/DayDetailed.scss';
interface Barber {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: number;
  }

interface Props {
    day: Date;
    barber: Barber | undefined;
    setFormTime: (date: Date, timeslot: number) => void;
}

const DayDetailed: React.FC<Props> = ({ day, barber, setFormTime }) => {
    const [timeslots, setTimeslots] = useState([]);
    const [isWorking, setIsWorking] = useState(false);

    function getMinutes(timeslot: number) {
        return (String(timeslot).slice(-2));
    }

    function getHours(timeslot: number) {
        let length = String(timeslot).length;
        
        if (length > 3) {
            return String(timeslot).slice(0, 2);
        } else {
            return String(timeslot).slice(0, 1);
        }

    }

    function handleClick(e: any) {
        e.preventDefault();
        setFormTime(day, e.target.value);
    }
    useEffect(() => {
        async function getTimeslot(){
            if (barber !== undefined) {
                const url = new URL(`http:/localhost:3000/barbers/${barber._id}/timeslots/${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`);
                const res = await fetch(url, {
                method: "GET"
                })
                setTimeslots(await res.json());
            } else {
                throw new Error('Selected barber not found')
            }
        }
        setTimeslots([]);
        getTimeslot();
    }, [barber, day])

    useEffect(() => {
        if (timeslots.length > 0) {
            setIsWorking(true)
        } else {
            setIsWorking(false)
        }
        
    }, [timeslots])
    return (
        <div className='timeslots'>
            {isWorking === false && 
            <div>Not working that day</div>
            }
            {timeslots.length > 0 && timeslots.map((timeslot) => {
                return (
                <button className='timeslot' key={timeslot} value={timeslot} onClick={handleClick}>
                    <div>{getHours(timeslot) + ":" + getMinutes(timeslot)}</div>
                    <div>&gt;</div>
                </button>)
            })}
        </div>
    );
}

export default DayDetailed;

