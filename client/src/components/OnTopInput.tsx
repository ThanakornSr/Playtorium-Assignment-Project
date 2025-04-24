import { useEffect, useState } from 'react'
import type { Category } from '@/types'

type OnTopType = 'category' | 'point'

export function OnTopInput({ onChange }: { onChange: (onTop: any) => void }) {
  const [type, setType] = useState<OnTopType>('category')
  const [category, setCategory] = useState<Category>('Accessories')
  const [value, setValue] = useState('')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (type === 'category') {
      onChange({ type: 'category', category, value })
    } else {
      onChange({ type: 'point', value })
    }
  }, [type, category, value])

  const handleOpen = () => {
    setValue('')
    setOpened(!opened)
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-6">
      <div className="flex items-center justify-between text-lg font-semibold">
        <h2 className="flex items-center gap-2">🏷️ On Top Discount</h2>
        <button
          className="cursor-pointer w-8 h-8 flex items-start justify-center text-xl font-bold bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-200"
          onClick={handleOpen}
        >
          {opened ? '-' : '+'}
        </button>
      </div>

      {opened && (
        <div className="flex flex-col gap-4 mt-3">
          <select
            aria-label="Select discount type"
            value={type}
            onChange={(e) => setType(e.target.value as OnTopType)}
            className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="category">Category</option>
            <option value="point">Point</option>
          </select>

          {type === 'category' ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                aria-label="Select category"
                onChange={(e) => setCategory(e.target.value as Category)}
                className="cursor-pointer w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
              </select>

              <input
                aria-label="Enter discount percentage"
                type="number"
                placeholder="% Discount"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          ) : (
            <input
              type="number"
              placeholder="Customer Points"
              value={value}
              onChange={(e) => setValue((e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          )}
        </div>
      )}
    </div>
  )
}
