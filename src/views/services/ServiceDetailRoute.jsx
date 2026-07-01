'use client'
import { Navigate, useParams } from 'react-router-dom'
import { getServiceData } from './serviceData'
import ServiceDetailPage from './ServiceDetailPage'

export default function ServiceDetailRoute() {
  const { pillar, service } = useParams()
  const data = getServiceData(pillar, service)

  if (!data) {
    return <Navigate to="/services" replace />
  }

  return <ServiceDetailPage data={data} />
}
