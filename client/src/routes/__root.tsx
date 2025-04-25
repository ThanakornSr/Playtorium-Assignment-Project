import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

export const Route = createRootRoute({
  component: () => (
    <div
      className="min-h-screen w-full p-4 flex flex-col items-center"
      style={{
        backgroundImage: 'linear-gradient(135deg, #95b8b6 50%, #f2ebeb 50%)',
      }}
    >
      <h1 className="text-2xl font-bold">🛍 Discount Calculator</h1>
      <Outlet />
      <Toaster />
    </div>
  ),
})
