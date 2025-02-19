export interface TaraweehTime {
  start_date: string
  end_date: string
  prayer_time: string
}

export interface JumuahTime {
  prayer_number: number
  prayer_time: string
  notes?: string
}

export interface EidTime {
  prayer_number: number
  prayer_time: string
  eid_type: "ul-fitr" | "ul-adha"
  notes?: string
}

export interface Mosque {
  id: string
  mosque_name: string
  address: string
  city: string
  additional_notes: string
  website?: string
  taraweeh?: {
    rakaat: number | null
    times: TaraweehTime[]
  }
  jumuah?: {
    times: JumuahTime[]
  }
  eid?: {
    times: EidTime[]
  }
}

export type PrayerType = "taraweeh" | "jumuah" | "eid"

