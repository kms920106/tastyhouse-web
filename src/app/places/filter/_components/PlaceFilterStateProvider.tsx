'use client'

import { PAGE_PATHS } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useContext, useState } from 'react'

interface FilterState {
  selectedStationId: number | undefined
  selectedFoodTypes: string[]
  selectedAmenities: string[]
  setSelectedStationId: (id: number | undefined) => void
  toggleFoodType: (id: string) => void
  toggleAmenity: (id: string) => void
  handleReset: () => void
  handleApplyFilter: () => void
  hasSelection: boolean
}

const PlaceFilterStateContext = createContext<FilterState | null>(null)

export function usePlaceFilterState() {
  const context = useContext(PlaceFilterStateContext)
  if (!context) {
    throw new Error('usePlaceFilterState must be used within PlaceFilterStateProvider')
  }
  return context
}

interface Props {
  children: ReactNode
  initialStationId?: number
  initialFoodTypes?: string[]
  initialAmenities?: string[]
}

export default function PlaceFilterStateProvider({
  children,
  initialStationId,
  initialFoodTypes = [],
  initialAmenities = [],
}: Props) {
  const router = useRouter()

  const [selectedStationId, setSelectedStationId] = useState<number | undefined>(initialStationId)
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>(initialFoodTypes)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialAmenities)

  const handleReset = () => {
    setSelectedStationId(undefined)
    setSelectedFoodTypes([])
    setSelectedAmenities([])
  }

  const toggleFoodType = (id: string) => {
    setSelectedFoodTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleApplyFilter = () => {
    const params = new URLSearchParams()

    if (selectedStationId) {
      params.set('stationId', selectedStationId.toString())
    }
    if (selectedFoodTypes.length > 0) {
      params.set('foodTypes', selectedFoodTypes.join(','))
    }
    if (selectedAmenities.length > 0) {
      params.set('amenities', selectedAmenities.join(','))
    }

    const queryString = params.toString()
    router.push(`${PAGE_PATHS.PLACES}${queryString ? `?${queryString}` : ''}`)
  }

  const hasSelection =
    !!selectedStationId || selectedFoodTypes.length > 0 || selectedAmenities.length > 0

  return (
    <PlaceFilterStateContext.Provider
      value={{
        selectedStationId,
        selectedFoodTypes,
        selectedAmenities,
        setSelectedStationId,
        toggleFoodType,
        toggleAmenity,
        handleReset,
        handleApplyFilter,
        hasSelection,
      }}
    >
      {children}
    </PlaceFilterStateContext.Provider>
  )
}
