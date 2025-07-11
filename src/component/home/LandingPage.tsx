'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getUpstoxAccessToken } from '@/service/StaticTokenService/staticService'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '@/redux/authSlice'

export const LandingPage = () => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()

  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const codeParam = searchParams.get('code')
    if (codeParam) {
      setCode(codeParam)
      getUpstoxAccessToken(codeParam)
        .then((res) => {
          if (res?.data?.access_token) {
            dispatch(setAccessToken(res.data.access_token))
          } else {
            setError(res?.data?.message || 'No token received')
          }
        })
        .catch((err) => setError('Token fetch failed'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      setError('No code found in URL')
    }
  }, [searchParams])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div>
      <h1>Login Successful</h1>
      <p>Code: {code}</p>
    </div>
  )
}
