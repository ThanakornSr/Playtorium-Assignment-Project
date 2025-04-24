import { createRoute } from '@tanstack/react-router'
import { useState } from 'react'
import axios from 'axios'
import { Route as RootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: HomePage,
})

function HomePage() {
  const [result, setResult] = useState<null | {
    totalBeforeDiscount: number
    totalAfterDiscount: number
  }>(null)

  const applyDiscount = async () => {
    const res = await axios.post('http://localhost:5000/apply-discount', {
      cart: [
        { name: 'T-Shirt', category: 'Clothing', price: 350 },
        { name: 'Hat', category: 'Accessories', price: 250 },
      ],
      discounts: {
        coupon: { type: 'fixed', value: 50 },
      },
    })
    setResult(res.data)
  }

  return (
    <div>
      <button
        onClick={applyDiscount}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Apply Discount
      </button>
      {result && (
        <div className="mt-4">
          <p>Total Before: {result.totalBeforeDiscount} THB</p>
          <p>Total After: {result.totalAfterDiscount} THB</p>
        </div>
      )}
    </div>
  )
}
