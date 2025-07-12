'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getUpstoxAccessToken } from '@/service/StaticTokenService/staticService'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '@/redux/authSlice'
import { message } from 'antd'

export const LandingPage = () => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()

  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccessToken = async () => {
      const codeParam = searchParams.get('code')
      if (codeParam) {
        setCode(codeParam)
        try {
          const response = await getUpstoxAccessToken(codeParam)
          if (response?.data?.access_token) {
            dispatch(setAccessToken(response.data.access_token))
          }
        } catch (error) {
          message.error('An unknown error occurred')
          setError('Failed to fetch access token')
        } finally {
          setLoading(false)
        }
      } else {
        setError('No code found in URL')
        setLoading(false)
      }
    }

    fetchAccessToken()
  }, [searchParams, dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div>
      <h1>Login Successful</h1>
      <p>Code: {code}</p>
    </div>
  )
}
