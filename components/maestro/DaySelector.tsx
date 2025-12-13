"use client"

import { DayNumber } from '@/lib/maestro/types'
import { DAY_CONFIGS } from '@/lib/maestro/constants'

interface DaySelectorProps {
  selectedDay: DayNumber
  onDayChange: (day: DayNumber) => void
}

export function DaySelector({ selectedDay, onDayChange }: DaySelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-[#F5F4F0] dark:bg-[#252525] rounded-lg">
      {([1, 2, 3] as DayNumber[]).map((day) => {
        const config = DAY_CONFIGS[day]
        const isSelected = selectedDay === day

        return (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              isSelected
                ? 'bg-white dark:bg-[#333333] text-[#1A1915] dark:text-[#ECECEC] shadow-sm'
                : 'text-[#706F6C] dark:text-[#B4B4B4] hover:text-[#1A1915] dark:hover:text-[#ECECEC]'
            }`}
          >
            Día {day}
          </button>
        )
      })}
    </div>
  )
}
