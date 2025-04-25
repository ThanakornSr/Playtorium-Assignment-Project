import { createRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Route as RootRoute } from './__root'
import type { CartItem, CouponDiscount, DiscountResult } from '@/types'
import { CartForm } from '@/components/CartForm'
import { CouponInput } from '@/components/CouponInput'
import { ResultBox } from '@/components/ResultBox'
import { OnTopInput } from '@/components/OnTopInput'
import { SeasonalInput } from '@/components/SeasonalInput'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: HomePage,
})

function HomePage() {
  const [cart, setCart] = useState<Array<CartItem>>([])
  const [coupon, setCoupon] = useState<CouponDiscount | null>(null)
  const [onTop, setOnTop] = useState<any | null>(null)
  const [seasonal, setSeasonal] = useState<any | null>(null)
  const [result, setResult] = useState<DiscountResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [discountOpen, setDiscountOpen] = useState(true)

  useEffect(() => {
    if (cart.length <= 0) {
      setShowResult(false)
    }
  }, [cart])

  const applyDiscount = async () => {
    try {
      const res = await axios.post('http://localhost:5050/api/apply-discount', {
        cart: cart,
        discounts: {
          coupon: coupon,
          on_top: onTop,
          seasonal: seasonal,
        },
      })

      setResult(res.data)
      setShowResult(true)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to apply discount:', error.response?.data?.error)
        toast.error(error.response?.data?.error || 'Something went wrong', {
          position: 'bottom-right',
        })
      } else {
        console.error('Unexpected error:', error)
        toast.error('An unexpected error occurred', {
          position: 'bottom-right',
        })
      }

      setShowResult(false)
    }
  }
  return (
    <div className="p-4 w-full max-w-250">
      <CartForm onChange={setCart} />

      <div className="mt-8 bg-white rounded-2xl shadow-md">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎯 Discount
          </h2>
          <button
            onClick={() => setDiscountOpen(!discountOpen)}
            className="cursor-pointer w-8 h-8 text-lg font-bold rounded-full bg-purple-500 text-white hover:bg-purple-600 transition duration-200 flex items-start justify-center"
          >
            {discountOpen ? '-' : '+'}
          </button>
        </div>

        <div className={`px-4 pb-4 space-y-6 ${discountOpen ? '' : 'hidden'}`}>
          <CouponInput onChange={setCoupon} />
          <OnTopInput onChange={setOnTop} />
          <SeasonalInput onChange={setSeasonal} />
        </div>
      </div>

      <button
        onClick={applyDiscount}
        className="transition duration-200 cursor-pointer shadow-md mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex sm:w-full justify-center"
      >
        Apply Discount
      </button>

      {showResult && (
        <ResultBox result={result} onClose={() => setShowResult(false)} />
      )}
    </div>
  )
}
