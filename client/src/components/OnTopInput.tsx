import { useEffect, useState } from 'react'
import type { Category } from '@/types'

type OnTopType = 'category' | 'point'

export function OnTopInput({ onChange }: { onChange: (onTop: any) => void }) {
  const [type, setType] = useState<OnTopType>('category')
  const [category, setCategory] = useState<Category>('Accessories')
  const [value, setValue] = useState<number>(0)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (type === 'category') {
      onChange({ type: 'category', category, value })
    } else {
      onChange({ type: 'point', value })
    }
  }, [type, category, value])

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
        <h2 className="flex items-center gap-2">🏷️ On Top Discount</h2>
        <button
          className="cursor-pointer w-8 h-8 flex items-start justify-center text-xl font-bold bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-200"
          onClick={handleOpen}
        >
          {opened ? '-' : '+'}
        </button>
      </div>

      {opened && (
        <div className="flex flex-col gap-4 mt-4">
          {/* Type Select */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="ontop-type"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Discount Type
            </label>
            <select
              id="ontop-type"
              aria-label="Select discount type"
              value={type}
              onChange={(e) => setType(e.target.value as OnTopType)}
              className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            >
              <option value="category">Category</option>
              <option value="point">Point</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select how the On Top discount should be applied
            </p>
          </div>

          {type === 'category' ? (
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Select */}
              <div className="flex flex-col w-full sm:w-1/2">
                <label
                  htmlFor="ontop-category"
                  className="text-sm font-medium mb-1 text-gray-700"
                >
                  Category
                </label>
                <select
                  id="ontop-category"
                  aria-label="Select category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                >
                  <option value="Accessories">Accessories</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose a category to apply the discount to
                </p>
              </div>

              {/* Discount Input */}
              <div className="relative flex flex-col w-full sm:w-1/2">
                <label
                  htmlFor="ontop-discount"
                  className="text-sm font-medium mb-1 text-gray-700"
                >
                  Discount Percentage
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    %
                  </span>
                  <input
                    id="ontop-discount"
                    type="number"
                    placeholder="e.g. 15"
                    min="0"
                    value={value}
                    onChange={(e) => {
                      let val = parseFloat(e.target.value.replace(/^0+/, ''))
                      val = Math.min(val, 100)
                      setValue(Number(val))
                    }}
                    className="pl-7 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a value between 0-100%
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col w-full">
              <label
                htmlFor="ontop-points"
                className="text-sm font-medium mb-1 text-gray-700"
              >
                Customer Points
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                  ⭐
                </span>
                <input
                  id="ontop-points"
                  type="number"
                  placeholder="e.g. 200"
                  min="0"
                  value={value}
                  onChange={(e) =>
                    setValue(parseFloat(e.target.value.replace(/^0+/, '')))
                  }
                  className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use points for discount (1 point = 1 THB, capped at 20% of
                total)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
