import { useEffect, useState } from 'react'

export function SeasonalInput({
  onChange,
}: {
  onChange: (seasonal: any) => void
}) {
  const [every, setEvery] = useState('')
  const [discount, setDiscount] = useState('')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    onChange({ every, discount })
  }, [every, discount])

  const handleOpen = () => {
    setEvery('')
    setDiscount('')
    setOpened(!opened)
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-6">
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
        <div className="flex flex-col sm:flex-row gap-4 mt-3">
          <input
            type="number"
            placeholder="Every X THB"
            value={every}
            onChange={(e) => setEvery(e.target.value)}
            className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            placeholder="Subtract Y THB"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}
    </div>
  )
}
