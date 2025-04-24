import { createRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
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
    } catch (error) {
      console.error('Failed to apply discount:', error)
      setShowResult(false)
    }
  }
  return (
    <div className="p-4">
      <CartForm onChange={setCart} />
      <CouponInput onChange={setCoupon} />
      <OnTopInput onChange={setOnTop} />
      <SeasonalInput onChange={setSeasonal} />
      <button
        onClick={applyDiscount}
        className="transition duration-200 cursor-pointer shadow-md mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex sm:w-full justify-center"
      >
        Apply Discount
      </button>
      {showResult && <ResultBox result={result} />}
    </div>
  )
}
