import { useState } from 'react'
import type { CartItem } from '@/types'

export function CartForm({
  onChange,
}: {
  onChange: (items: Array<CartItem>) => void
}) {
  const [items, setItems] = useState<Array<CartItem>>([])

  const handleAdd = () => {
    const newItem: CartItem = {
      name: '',
      category: '',
      price: undefined,
      amount: undefined,
    }
    const updated = [...items, newItem]
    setItems(updated)
    onChange(updated)
  }

  const updateItem = (i: number, field: keyof CartItem, value: string) => {
    const updated = [...items]
    updated[i] = {
      ...updated[i],
      [field]:
        field === 'price' || field === 'amount' ? parseFloat(value) : value,
    }
    setItems(updated)
    onChange(updated)
  }

  const removeItem = (i: number) => {
    const updated = items.filter((_, index) => index !== i)
    setItems(updated)
    onChange(updated)
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🛒 Cart Items
      </h2>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 mb-4 items-center bg-gray-50 p-3 rounded-lg shadow-sm"
        >
          <input
            placeholder="Name"
            value={item.name}
            onChange={(e) => updateItem(i, 'name', e.target.value)}
            className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            aria-label="label for the select"
            value={item.category}
            onChange={(e) => updateItem(i, 'category', e.target.value)}
            className="cursor-pointer flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
          </select>
          <input
            placeholder="Price"
            type="number"
            value={item.price ?? ''}
            onChange={(e) => updateItem(i, 'price', e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Amount"
            type="number"
            value={item.amount ?? ''}
            onChange={(e) => updateItem(i, 'amount', e.target.value)}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="cursor-pointer px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
            onClick={() => removeItem(i)}
          >
            ✖
          </button>
        </div>
      ))}
      <button
        className="cursor-pointer mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition duration-200 shadow-md"
        onClick={handleAdd}
      >
        Add Item
      </button>
    </div>
  )
}
