import React from 'react'

const Calendar = () => {
    const startOfMonth: Date = new Date(2024, 0, 1);
    const endOfMonth: Date = new Date(2024, 0, 31);

    const daysInMonth: number = Math.floor((endOfMonth.getTime() - startOfMonth.getTime()) / (24 * 60 * 60 * 1000)) + 1

    const weekdays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const generateDates = (): (Date | undefined)[] => {
        const dates: (Date | undefined)[] = [];
        for (let i = 0; i < daysInMonth; i++) {
            const currentDate: Date = new Date(startOfMonth);
            currentDate.setDate(startOfMonth.getDate() + i);
            dates.push(currentDate);
        }
        return dates;
    };

    const dates: (Date | undefined)[] = generateDates();

    return (
        <div className='p-10'>
            Calendar

            <div className='text-center text-2xl font-extrabold '>
                January
            </div>

            <div className='p-10'>
                <table className="min-w-full border border-gray-300 p-10">
                    <thead>
                        <tr>
                            <th className='border-b p-2'>
                                DAYS
                            </th>
                            {weekdays.map(day => (
                                <th 
                                    key={day}
                                    className='border-b p-2'
                                >
                                    {day}
                                </th>
                            ))}
                            <th className='border-b p-2'>
                                Totals
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className='border px-2 py-1'>Week {rowIndex + 1}</td>
                                {[...Array(7)].map((_, colIndex) => (
                                    <td key={colIndex} className="border px-2 py-1">
                                        {dates[rowIndex * 7 + colIndex]?.getDate()}
                                    </td>
                                ))}
                                <td className='border px-2 py-1'>Total for Week {rowIndex + 1}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar
