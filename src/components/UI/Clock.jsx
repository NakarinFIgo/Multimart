import React, { useEffect, useState } from 'react';

function Clock() {
    const [days, setDay] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;

    const countDown = () => {
        const destination = new Date('2024-06-01').getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = destination - now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (difference > 0) {
                setDay(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };

    useEffect(() => {
        countDown();
        return () => clearInterval(interval); // ล้าง interval เมื่อคอมโพเนนต์ถูกทำลาย
    }, []);

    return (
        <div className='flex mt-5 pl-8 xl:pl-[40px] text-center'>
            <div className='flex gap-4'>
                <div className='grid'>
                    <h1 className='text-3xl'>{days}</h1>
                    <h3>Days</h3>
                </div>
                <span className='text-xl px-2 py-2'>:</span>
            </div>
            <div className='flex gap-4'>
                <div className='grid'>
                    <h1 className='text-3xl'>{hours}</h1>
                    <h3>Hour</h3>
                </div>
                <span className='text-xl px-2 py-2'>:</span>
            </div>
            <div className='flex gap-4'>
                <div className='grid'>
                    <h1 className='text-3xl'>{minutes}</h1>
                    <h3>Minute</h3>
                </div>
                <span className='text-xl px-2 py-2'>:</span>
            </div>
            <div className='flex gap-4'>
                <div className='grid'>
                    <h1 className='text-3xl'>{seconds}</h1>
                    <h3>Seconds</h3>
                </div>
            </div>
        </div>
    );
}

export default Clock;
