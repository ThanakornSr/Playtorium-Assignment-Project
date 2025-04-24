import { useEffect, useState } from 'react'
import type { CouponDiscount } from '@/types'

export function CouponInput({
  onChange,
}: {
  onChange: (coupon: CouponDiscount) => void
}) {
  const [type, setType] = useState<CouponDiscount['type']>('fixed')
  const [value, setValue] = useState('')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    onChange({ type, value: Number(value) })
  }, [type, value])

  useEffect(() => {
    setValue('')
  }, [type])

  const handleOpen = () => {
    setValue('')
    setOpened(!opened)
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-6">
      <div className="flex items-center justify-between text-lg font-semibold">
        <h2 className="flex items-center gap-2">🎟️ Coupon</h2>
        <button
          className="cursor-pointer w-8 h-8 flex items-start justify-center text-xl font-bold bg-rose-500 text-white rounded-full hover:bg-rose-600 transition duration-200"
          onClick={handleOpen}
        >
          {opened ? '-' : '+'}
        </button>
      </div>

      {opened && (
        <div className="flex flex-col sm:flex-row gap-4 mt-3">
          <select
            aria-label="label for the select"
            value={type}
            onChange={(e) => setType(e.target.value as CouponDiscount['type'])}
            className="cursor-pointer w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>

          <input
            aria-label="label for the input"
            type="number"
            value={value}
            onChange={(e) => {
              let val = parseFloat(e.target.value)
              if (type === 'percentage') {
                val = Math.min(val, 100)
              }
              setValue(String(val))
            }}
            max={type === 'percentage' ? 100 : undefined}
            placeholder={type === 'percentage' ? '% Discount' : 'Enter amount'}
            className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      )}
    </div>
  )
}
