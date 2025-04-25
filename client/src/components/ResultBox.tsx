import { useEffect, useState } from 'react'
import type { DiscountResult } from '@/types'

export function ResultBox({
  result,
  onClose,
}: {
  result: DiscountResult | null
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (result) {
      setVisible(true)
    }
  }, [result])

  if (!result) return null

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 200) // match duration below
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div
        className={`relative w-[90%] max-w-md p-6 bg-white rounded-2xl shadow-xl transform transition-all duration-200 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="cursor-pointer absolute top-3 right-4 text-gray-600 hover:text-red-500 text-lg font-bold"
        >
          ✖
        </button>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          💰 Result
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Total Before Discount:</span>{' '}
            {result.totalBeforeDiscount.toLocaleString()} THB
          </p>
          <p>
            <span className="font-medium">Total After Discount:</span>{' '}
            {result.totalAfterDiscount.toLocaleString()} THB
          </p>
        </div>
      </div>
    </div>
  )
}
