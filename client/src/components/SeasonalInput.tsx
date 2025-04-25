import { useEffect, useState } from 'react'

export function SeasonalInput({
  onChange,
}: {
  onChange: (seasonal: any) => void
}) {
  const [every, setEvery] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    onChange({ every, discount })
  }, [every, discount])

  const handleOpen = () => {
    setEvery(0)
    setDiscount(0)
    setOpened(!opened)
  }

  return (
    <div className="p-4 bg-gray-50 rounded-2xl shadow-md mt-6">
      <div className="flex items-center justify-between text-lg font-semibold">
        <h2 className="flex items-center gap-2">📅 Seasonal Discount</h2>
        <button
          className="cursor-pointer w-8 h-8 flex items-start justify-center text-xl font-bold bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-200"
          onClick={handleOpen}
        >
          {opened ? '-' : '+'}
        </button>
      </div>

      {opened && (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Every X THB */}
          <div className="relative flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="seasonal-every"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Every X THB
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                ฿
              </span>
              <input
                id="seasonal-every"
                type="number"
                placeholder="e.g. 1000"
                min="0"
                value={every}
                onChange={(e) =>
                  setEvery(parseFloat(e.target.value.replace(/^0+/, '')))
                }
                className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Trigger this discount every X Baht spent
            </p>
          </div>

          {/* Subtract Y THB */}
          <div className="relative flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="seasonal-discount"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Subtract Y THB
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                –฿
              </span>
              <input
                id="seasonal-discount"
                type="number"
                placeholder="e.g. 100"
                min="0"
                value={discount}
                onChange={(e) =>
                  setDiscount(parseFloat(e.target.value.replace(/^0+/, '')))
                }
                className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Amount to subtract each time threshold is met
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
