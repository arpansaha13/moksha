import React from 'react'
import { Link } from 'react-router-dom'
import AuthProvider from '../containers/AuthProvider'

export default function AuthLayout({ children, heading }) {
  return (
    <div className="w-screen h-screen">
      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="block mx-auto w-16 h-16 relative">
            <img src="/moksha-logo.svg" alt="Moksha logo" />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-50">
            {heading}
          </h2>
        </div>

        <div className="mt-8 w-full [&>*]:sm:mx-auto [&>*]:py-8 [&>*]px-4 [&>*]:sm:px-10 [&>*]:sm:w-full [&>*]:bg-amber-900/40 [&>*]:sm:rounded-lg [&>*]:shadow">
          <AuthProvider>
            {/* Use appropriate max-w-{size} on the root of this children */}
            {children}
          </AuthProvider>
        </div>
      </div>
    </div>
  )
}
