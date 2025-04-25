import { useEffect, useState } from 'react'
import type { CouponDiscount } from '@/types'

export function CouponInput({
  onChange,
}: {
  onChange: (coupon: CouponDiscount) => void
}) {
  const [type, setType] = useState<CouponDiscount['type']>('fixed')
  const [value, setValue] = useState<number>(0)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    onChange({ type, value: Number(value) })
  }, [type, value])

  useEffect(() => {
    setValue(0)
  }, [type])

  const handleOpen = () => {
    setValue(0)
    setOpened(!opened)
  }

  return (
    <div className="p-4 bg-gray-50 rounded-2xl shadow-md mt-6">
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
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Coupon Type */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="coupon-type"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Coupon Type
            </label>
            <select
              id="coupon-type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as CouponDiscount['type'])
              }
              className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
            >
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select how the coupon discount should be applied
            </p>
          </div>

          {/* Coupon Value */}
          <div className="relative flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="coupon-value"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              {type === 'percentage'
                ? 'Discount Percentage'
                : 'Discount Amount'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {type === 'percentage' ? '%' : '฿'}
              </span>
              <input
                id="coupon-value"
                type="number"
                min="0"
                value={value}
                onChange={(e) => {
                  let val = parseFloat(e.target.value.replace(/^0+/, ''))
                  if (type === 'percentage') {
                    val = Math.min(val, 100)
                  }
                  setValue(Number(val))
                }}
                max={type === 'percentage' ? 100 : undefined}
                placeholder={type === 'percentage' ? 'e.g. 10' : 'e.g. 200'}
                className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {type === 'percentage'
                ? 'Enter a value between 0-100%'
                : 'Amount to subtract from total'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
