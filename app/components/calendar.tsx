'use client'

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isSameMonth, differenceInCalendarDays, startOfYear, addMonths } from 'date-fns'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const goToPreviousMonth = () => {
        setCurrentDate(addMonths(currentDate, -1));
    };

    // Get start and end dates of current month
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    // Get start and end dates of the week that contains the start and end of the month
    const weekStart = startOfWeek(monthStart);
    const weekEnd = endOfWeek(monthEnd);

    // Array of dates for each day in the interval
    const dates = eachDayOfInterval({ start: weekStart, end: weekEnd });

    // Format the current month and year
    const monthYear = format(currentDate, 'MMMM yyyy');

    // Format day of the week
    const dayFormat = 'EEE';

    // Format the day of the month
    const dateFormat = 'd';

    return (
        <div className='flex flex-col items-center p-4 w-full'>
            <div className='flex flex-row justify-around w-full p-10'>
                <button
                    className="btn btn-active btn-primary"
                    onClick={goToPreviousMonth}
                >
                    Prev
                </button>

                <div className='text-2xl font-bold'>
                    {monthYear}
                </div>

                <button
                    className="btn btn-active btn-primary"
                    onClick={goToNextMonth}
                >
                    Next
                </button>
            </div>

            <div className='w-full flex flex-row justify-around'>
                <div className='grid grid-cols-7 gap-x-24 gap-y-8'>
                    {/* Display days of the week */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className='text-center text-sm text-gray-500'>
                            {day}
                        </div>
                    ))}

                    {dates.map((date, index) => {
                        // Check if the date is in the same month as the current date
                        const isCurrentMonth = isSameMonth(date, currentDate);

                        // Chekc if the date is samae as the current date
                        const isToday = isSameDay(date, new Date());

                        // Apply some styles based on the conditions
                        const dateClass = isCurrentMonth ? isToday ? "bg-blue-500 text-white rounded-full" : "text-gray-800" : "text-gray-400";

                        return (
                            <div key={index} className='flex flex-col items-center'>
                                <div className='text-sm'>
                                    {format(date, dateFormat)}
                                </div>

                                <input type="checkbox" id={`date-${index}`} />

                                <div className='text-xs text-gray-500 mt-1'>
                                    {differenceInCalendarDays(date, startOfYear(date)) + 1}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className=' flex flex-col justify-center items-center align-middle'>
                    <div className='text-lg font-bold'>
                        Totals
                    </div>
                    {/* Calculate and display the total for each row */}
                    {[0, 1, 2, 3, 4, 5].map(row => {
                        const rowDates = dates.slice(row * 7, (row + 1) * 7);
                        const rowTotal = rowDates.reduce((total, date) => {
                            return total + differenceInCalendarDays(date, startOfYear(date)) + 1;
                        }, 0);

                        return (
                            <div key={row} className='flex flex-col items-center pt-8'>
                                <div className='text-sm'>
                                    Total: {rowTotal}
                                </div>
                            </div>
                        );
                    })}

                    {/* Calculate and display the total for the entire grid */}
                    <div className='flex flex-col items-center mt-4'>
                        <div className='text-sm font-bold pt-6'>
                            Total for all rows:
                            {' '}
                            {dates.reduce((total, date) => {
                                return total + differenceInCalendarDays(date, startOfYear(date)) + 1;
                            }, 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
