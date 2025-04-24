import type { DiscountResult } from '@/types'

export function ResultBox({ result }: { result: DiscountResult | null }) {
  if (!result) return null

  return (
    <div className="mt-6 p-4 bg-white rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
        💰 Result
      </h3>
      <div className="space-y-1 text-gray-700">
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
  )
}
