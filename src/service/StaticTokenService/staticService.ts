import axios, { AxiosError } from 'axios'

const config = {
  baseURL: process.env.NEXT_PUBLIC_APP_API_ENDPOINT,
  timeout: 5000
}

// ✅ Login (existing)
export const authLogin = async (authData: {
  email: string
  password: string
}) => {
  try {
    const response = await axios.post('/auth/login/user', authData, config)
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data
    }
    return {
      message: 'Something went wrong'
    }
  }
}

// ✅ NEW: Exchange Upstox Code for Access Token
export const getUpstoxAccessToken = async (code: string) => {
  try {
    const response = await axios.post(
      '/auth/get-access-token',
      { code },
      config
    )
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data
    }
    return {
      message: 'Something went wrong while getting access token'
    }
  }
}
