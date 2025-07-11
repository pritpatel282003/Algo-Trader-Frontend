import React, { Suspense } from 'react'
import { LandingPage } from '@/component/home/LandingPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LandingPage />
    </Suspense>
  )
}
