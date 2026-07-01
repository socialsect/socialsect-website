'use client'
import { Navigate, useParams } from 'react-router-dom'
import { getSpecialtyData } from './specialtyData'
import SpecialtyPage from './SpecialtyPage'

export default function SpecialtyPageRoute() {
  const { specialty } = useParams()
  const data = getSpecialtyData(specialty)

  if (!data) {
    return <Navigate to="/who-we-help" replace />
  }

  return <SpecialtyPage data={data} slug={specialty} />
}
