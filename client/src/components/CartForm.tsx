import { useState } from 'react'
import toast from 'react-hot-toast'
import type { CartItem } from '@/types'

export function CartForm({
  onChange,
}: {
  onChange: (items: Array<CartItem>) => void
}) {
  const [items, setItems] = useState<Array<CartItem>>([])

  const handleAdd = () => {
    toast.success('item added successfully', { position: 'bottom-right' })
    const newItem: CartItem = {
      name: '',
      category: 'Accessories',
      price: 0,
      amount: 1,
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
          className="flex flex-wrap sm:flex-nowrap gap-4 mb-6 items-start bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          {/* Name */}
          <div className="flex flex-col flex-1 min-w-[120px] relative">
            <label
              htmlFor={`name-${i}`}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <span className="absolute left-3 top-1/2 text-gray-400">💬</span>
            <input
              id={`name-${i}`}
              placeholder="e.g. T-shirt"
              value={item.name}
              onChange={(e) => updateItem(i, 'name', e.target.value)}
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col flex-1 min-w-[120px] relative">
            <label
              htmlFor={`category-${i}`}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id={`category-${i}`}
              value={item.category}
              onChange={(e) => updateItem(i, 'category', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
            >
              <option value="Accessories">Accessories</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col w-24 relative">
            <label
              htmlFor={`price-${i}`}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Price (฿)
            </label>
            <span className="absolute left-3 top-1/2 text-gray-400">฿</span>
            <input
              id={`price-${i}`}
              type="number"
              placeholder="0"
              min="0"
              value={item.price}
              onChange={(e) => updateItem(i, 'price', e.target.value)}
              className="pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col w-24 relative">
            <label
              htmlFor={`amount-${i}`}
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <input
              id={`amount-${i}`}
              type="number"
              placeholder="1"
              min="1"
              value={item.amount}
              onChange={(e) => updateItem(i, 'amount', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Remove */}
          <button
            className="mt-6 sm:mt-[26px] px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200"
            onClick={() => {
              removeItem(i)
              toast.success('item removed successfully', { position: 'bottom-right' })
            }}
          >
            ✖
          </button>
        </div>
      ))}

      <button
        className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition duration-200 shadow-md"
        onClick={handleAdd}
      >
        ➕ Add Item
      </button>
    </div>
  )
}
