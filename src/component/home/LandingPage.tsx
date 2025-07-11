'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export const LandingPage = () => {
  const searchParams = useSearchParams()
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const codeParam = searchParams.get('code')
    if (codeParam) {
      setCode(codeParam)
      console.log("Extracted Code:", codeParam)
    }
  }, [searchParams])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Code From Upstox:</h1>
      <p className="mt-2 text-lg text-blue-600">{code}</p>
    </div>
  )
}
