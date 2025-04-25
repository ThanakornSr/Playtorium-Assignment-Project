import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

export const Route = createRootRoute({
  component: () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold">🛍 Discount Calculator</h1>
      <Outlet />
      <Toaster />
    </div>
  ),
})
