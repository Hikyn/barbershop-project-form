import { useEffect, useState } from 'react';
import '../styling/DayDetailed.scss';
import { IBarber, ICustomer, IForm, ILocation, IService } from '../interfaces/interfaces';

interface Props {
    day: Date;
    barber: IBarber | undefined;
    barbershop: ILocation | undefined;
    setFormTime: (date: Date, timeslot: number) => void;
    setFormBarber: (barber: IBarber) => void;
    setFormTimeBarber: (date: Date, timeslot: number, barber: IBarber) => void;
}

const DayDetailed: React.FC<Props> = ({ day, barber, barbershop, setFormTime, setFormBarber, setFormTimeBarber }) => {
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
        async function getRandomBarber(){
            if (barbershop !== undefined) {
                const url = new URL(`http:/localhost:3000/barbers/timeslots/${barbershop._id}/${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}/${e.target.value}/randomBarber`);
                const res = await fetch(url, {
                method: "GET"
                }).then(barber => barber.json());
                //console.log(res);
                setFormTimeBarber(day, e.target.value, res);
            } else {
                throw new Error('Failed to select random barber')
            }
        }

        e.preventDefault();
        if (barber !== undefined && barber._id === "000") {
            getRandomBarber();
            console.log('Selecting random barber');
        } else {
            console.log('Debug 51')
            setFormTime(day, e.target.value);
        }
        
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

        async function getAllBarbersTimeslots(){
            if (barbershop !== undefined) {
                const url = new URL(`http:/localhost:3000/barbers/timeslots/${barbershop._id}/${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`);
                const res = await fetch(url, {
                method: "GET"
                })
                setTimeslots(await res.json());
            } else {
                throw new Error('Selected barbershop not found')
            }
        }
        setTimeslots([]);
        if (barber !== undefined && barber._id === "000") {
            getAllBarbersTimeslots();
        } else {
            getTimeslot();
        }

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

